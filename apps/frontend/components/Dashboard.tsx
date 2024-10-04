"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const DashBoard = ({
  Requests,
  userId,
}: {
  Requests: any;
  userId: number;
}) => {
  const setNotification = useSetRecoilState(notificationState);
  const router = useRouter();

  // Maintain accept state per request
  const [acceptedRequests, setAcceptedRequests] = useState<number[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    const hasShownNotification = localStorage.getItem("notificationShown");
    if (!hasShownNotification) {
      setToggle(true);
      localStorage.setItem("notificationShown", "true");
    }
    const handleTabClose = () => {
      localStorage.removeItem("notificationShown");
    };
    // Add event listener for tab close
    window.addEventListener("beforeunload", handleTabClose);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  const handleAcceptRequest = async (senderId: number) => {
    try {
      await axios.post(`${apiUrl}/friends/friend-request/accept`, {
        senderId: senderId,
        receiverId: userId,
      });

      // Update accepted state for this request
      setAcceptedRequests((prev) => [...prev, senderId]);
      setNotification({ msg: "Friend Request Accepted", type: "success" });
    } catch (error: any) {
      setNotification({
        msg: error.response?.data.msg || "Error accepting request",
        type: "error",
      });
    }
  };

  return (
    <div className="flex w-full h-full gap-4 justify-center items-center md:text-base sm:text-sm xxs:text-xs flex-col">
      {toggle && (
        <div className="flex absolute top-2 justify-center items-center break-all gap-1 p-2 border rounded-md border-slate-600 bg-gray-700 bg-opacity-80 mx-2">
          <p className="text-amber-700 italic font-bold">
            Please Update Your Detail From{" "}
            <span className="text-sky-500">Profile</span> For Better Experience.
          </p>
          <div
            className="flex justify-center items-center p-1 bg-slate-700 rounded-md cursor-pointer"
            onClick={() => {
              setToggle((x) => !x);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
      <div className="flex flex-col xl:w-3/6 lg:w-4/6 md:w-4/5 sm2:w-5/6 xxs:w-full  max-h-full rounded-md p-2">
        <div className="flex justify-center items-center p-3 w-full">
          <div className=" w-2/6">
            <button
              className="p-2 bg-red-600 rounded-l-lg transition hover:bg-red-700 w-full"
              onClick={() => {
                router.push("dashboard/freshers");
              }}
            >
              Freshers
            </button>
          </div>
          <div className=" w-2/6">
            <button
              className="p-2 bg-blue-600 w-full transition hover:bg-blue-700"
              onClick={() => {
                router.push("dashboard/alumni");
              }}
            >
              Alumni
            </button>
          </div>
          <div className=" w-2/6">
            <button
              className="p-2 bg-teal-600 w-full rounded-r-lg transition hover:bg-teal-700"
              onClick={() => {
                router.push("/friends");
              }}
            >
              Friends
            </button>
          </div>
        </div>

        <div className="bg-teal-950 flex flex-col w-full gap-2 rounded-md p-2 h-4/5 md:px-12">
          {Requests.length > 0 ? (
            Requests.map((x: any, ind: number) => (
              <div
                key={ind}
                className="border rounded bg-slate-900 p-2 flex gap-1 justify-between items-center border-slate-800 hover:bg-gray-800 "
              >
                <div className="flex gap-1 items-center">
                  <div className="border bg-slate-800 p-1 rounded-md w-10 h-10 text-center border-teal-900 flex justify-center items-center">
                    <p className="font-bold xxs:text-base">
                      {" "}
                      {x.sender.name ? x.sender.name.toUpperCase()[0] : "U"}
                    </p>
                  </div>
                  <div className="flex flex-col pl-3">
                    <div className="text-rose-800 font-semibold">
                      {x.sender.name.toUpperCase()}
                    </div>
                    <div className="text-cyan-700 font-light">
                      {x.sender.affiliates === "freshers"
                        ? `Joined as a ${x.sender.affiliates}`
                        : `Joined as an ${x.sender.affiliates}`}
                    </div>
                  </div>
                </div>
                <div className="flex sm2:items-center  gap-1 sm2:flex-row xxs:flex-col">
                  <button
                    className="border border-gray-700 p-1 px-2 rounded-md"
                    onClick={() => {
                      router.push(`/user/?id=${x.sender.id}`);
                    }}
                  >
                    View
                  </button>

                  {/* Check if request is already accepted */}
                  <AcceptReq
                    disable={acceptedRequests.includes(x.sender.id)}
                    onClick={() => handleAcceptRequest(x.sender.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="border rounded bg-slate-900 p-1 text-center border-slate-800 text-teal-600">
              NO REQUESTS
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// AcceptReq Component for the "Accept" button
const AcceptReq = ({
  disable,
  onClick,
}: {
  disable: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      disabled={disable}
      className={
        disable
          ? `border border-blue-700 px-2 bg-blue-900 p-1 rounded-md cursor-not-allowed`
          : `border border-blue-700 px-2 bg-blue-800 p-1 rounded-md`
      }
      onClick={onClick}
    >
      {disable ? "Accepted" : "Accept"}
    </button>
  );
};
