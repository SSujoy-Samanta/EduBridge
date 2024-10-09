"use client";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { useSession } from "next-auth/react";
import { Chatuser } from "./ChatsUser";

const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

function useSocket(room: string, id: number | null, senderName: string | null) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    console.log(senderName);
    if (id && room && wsUrl && senderName) {
      const newSocket = new WebSocket(wsUrl);

      newSocket.onopen = () => {
        console.log("Socket connected");
        // Send the message to join the room
        newSocket.send(
          JSON.stringify({ type: "JoinRoom", room, userId: id, senderName }),
        );
      };

      newSocket.onclose = () => {
        console.log("Socket disconnected");
      };

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [id, room, senderName]);

  return socket;
}

function useUserDetails() {
  const { data: session } = useSession();
  const [username, setUsername] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (session) {
      setUsername(session.user?.name || null);
      //@ts-ignore
      const userId = session.user?.id;
      if (typeof userId === "number") {
        setId(userId);
      } else if (typeof userId === "string") {
        setId(parseInt(userId, 10));
      } else {
        setId(null);
      }
    }
  }, [session]);

  return { username, id };
}

export const Chating = ({ userId, room }: { userId: number; room: string }) => {
  const { username, id } = useUserDetails();
  const socket = useSocket(room, userId, username);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { type: string; content: string; userId: number; senderName: string }[]
  >([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [group, setGroup] = useState<boolean>(false);

  useEffect(() => {
    if (socket) {
      const handleMessage = (msg: MessageEvent) => {
        const messageData = JSON.parse(msg.data);
        //console.log(messageData)
        setMessages((prevMessages) => [...prevMessages, messageData]);
      };

      socket.addEventListener("message", handleMessage);

      return () => {
        socket.removeEventListener("message", handleMessage);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (socket && input.trim()) {
        socket.send(
          JSON.stringify({
            type: "sendMessage",
            content: input.trim(),
            userId: id,
            senderName: username,
          }),
        );
        setInput("");
      }
      event.preventDefault();
    }
  };
  const goBack = () => {
    window.history.back();
  };
  const closeWindow = () => {
    window.close();
  };

  return (
    <div className="w-full flex justify-evenly mb-2">
      <div className="text-white bg-cyan-500 lg:w-3/5 md:w-5/6 xxs:w-11/12 flex flex-col p-3 border rounded-md border-teal-700 gap-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="rounded-full p-2 border w-10 h-10 text-center text-white bg-black border-cyan-950">
              {room ? room[0].toUpperCase() : "U"}
            </div>
            <p className="pl-2">{room || "Unknown"}</p>
          </div>
          <div className="flex gap-1">
            <button
              className="border p-1 rounded-md border-green-900 bg-green-600 flex justify-start items-center  lg:hidden"
              onClick={() => {
                setGroup((x) => !x);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="size-6"
              >
                <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
              </svg>
            </button>
            <button
              onClick={() => {
                goBack();
                closeWindow();
              }}
              className="border p-1 rounded-md border-slate-900 bg-slate-900 flex justify-start items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className="border border-cyan-900 p-2 rounded-md overflow-auto h-96 bg-slate-900"
          ref={containerRef}
        >
          {messages.map((msg, ind) =>
            msg.type === "message" ? (
              <Message
                key={ind}
                type={msg.userId === id ? "You" : msg.senderName}
                msg={msg.content}
                user={msg.senderName}
              />
            ) : (
              <Message
                key={ind}
                type={"Joining"}
                msg={msg.content}
                user={"User"}
              />
            ),
          )}
        </div>
        <div className="flex justify-between p-2 gap-2">
          <input
            value={input}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInput(e.target.value)}
            className="text-black w-full rounded-md p-2"
            placeholder="Message..."
          />
          <button
            onClick={() => {
              if (socket && input.trim()) {
                socket.send(
                  JSON.stringify({
                    type: "sendMessage",
                    content: input.trim(),
                    userId: id,
                    senderName: username,
                  }),
                );
                setInput("");
              }
            }}
            className="border rounded-md border-slate-800 p-2 bg-green-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              className="size-6"
            >
              <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 000 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`lg:w-1/5 xxs:w-5/6 sm:w-4/6 xxs:top-24 lg:block ${group ? "xxs:absolute" : "xxs:hidden"} border-2 border-cyan-900 rounded-md p-2 overflow-auto bg-black`}
      >
        <Chatuser room={room} userId={userId} setGroup={setGroup} />
      </div>
    </div>
  );
};
