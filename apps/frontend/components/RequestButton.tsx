import axios from "axios";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function useStatus(senderId: number, receiverId: number, trigger: boolean) {
  const [status, setStatus] = useState<string | null>(null);
  const [actualSender, setActualSender] = useState<number | null>(null);
  const [actualReceiver, setActualReceiver] = useState<number | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`${apiUrl}/friends/friend-request/status`, {
          params: { senderId, receiverId },
        });
        if (res.data.result) {
          setStatus(res.data.result.status); // Set the request status
          setActualSender(res.data.result.senderId);
          setActualReceiver(res.data.result.receiverId);
        } else {
          setStatus(null);
          setActualSender(null);
          setActualReceiver(null);
        }
      } catch (error) {
        console.error("Error fetching status:", error);
        setStatus(null);
        setActualSender(null);
        setActualReceiver(null);
      }
    };

    if (senderId && receiverId) {
      fetchStatus();
    }
  }, [senderId, receiverId, trigger]); // Include trigger in dependency array

  return {
    status,
    actualSender,
    actualReceiver,
  };
}

export const RequestButton = ({
  userId,
  receiverId,
}: {
  userId: number;
  receiverId: number;
}) => {
  const setNotification = useSetRecoilState(notificationState);
  const [trigger, setTrigger] = useState<boolean>(false);
  const { status, actualSender, actualReceiver } = useStatus(
    userId,
    receiverId,
    trigger,
  );

  // Throttle request submission to avoid spamming
  const [loading, setLoading] = useState(false);

  const toggleTrigger = useCallback(() => {
    setTrigger((prev) => !prev);
  }, []);
  const handleSendRequest = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/friends/friend-request`, {
        senderId: userId,
        receiverId: receiverId,
      });
      toggleTrigger(); // Toggle trigger to re-fetch status
      setNotification({ msg: "Request Sent Successfully", type: "success" });
    } catch (error: any) {
      setNotification({
        msg: error.response?.data.msg || "Error sending request",
        type: "error",
      });
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRequest = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/friends/friend-request/decline`, {
        senderId: actualSender, // Use actual sender
        receiverId: actualReceiver,
      });
      toggleTrigger(); // Toggle trigger to re-fetch status
      setNotification({
        msg: "Request Canceled Successfully",
        type: "success",
      });
    } catch (error: any) {
      setNotification({
        msg: error.response?.data.msg || "Error canceling request",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/friends/friend-request/accept`, {
        senderId: receiverId, // Use actual sender
        receiverId: userId,
      });
      toggleTrigger(); // Toggle trigger to re-fetch status
      setNotification({ msg: "Friend Request Accepted", type: "success" });
    } catch (error: any) {
      setNotification({
        msg: error.response?.data.msg || "Error accepting request",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnfriend = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/friends/friend-request/decline`, {
        senderId: userId,
        receiverId: receiverId,
      });
      toggleTrigger(); // Toggle trigger to re-fetch status
      setNotification({ msg: "Unfriend Successful", type: "success" });
    } catch (error: any) {
      setNotification({
        msg: error.response?.data.msg || "Error while unfriending",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  //{console.log("Status:", status, "Actual Sender:", actualSender, "Actual Receiver:", actualReceiver)}
  return (
    <div className="flex flex-col gap-2 lg:w-2/5 md:w-3/5 xxs:w-5/6 justify-center items-center">
      {status === null ? (
        <button
          className="rounded p-2 bg-blue-600 w-1/2"
          onClick={handleSendRequest}
          disabled={loading}
        >
          CONNECT
        </button>
      ) : status === "PENDING" && userId === actualSender ? (
        <button
          className="rounded  w-1/2 p-2 bg-red-600"
          onClick={handleCancelRequest}
          disabled={loading}
        >
          Cancel Request
        </button>
      ) : status === "PENDING" && userId === actualReceiver ? (
        <div className="flex flex-row justify-center gap-2 w-full">
          <button
            className="rounded p-2 bg-blue-600 w-1/2"
            onClick={handleAcceptRequest}
            disabled={loading}
          >
            Accept
          </button>
          <button
            className="rounded p-2 bg-red-600 w-1/2"
            onClick={handleCancelRequest}
            disabled={loading}
          >
            Decline
          </button>
        </div>
      ) : (
        <button
          className="rounded  w-1/2 p-2 bg-slate-800"
          onClick={handleUnfriend}
          disabled={loading}
        >
          Unfriend
        </button>
      )}
    </div>
  );
};
