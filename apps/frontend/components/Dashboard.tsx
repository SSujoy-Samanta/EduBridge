"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";
import { PostFeed } from "./Posts/PostFeed";
import { CreatePost } from "./Posts/CreatPost";
import { OwnPost } from "./Posts/OwnPost";
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
  const [View,setView]=useState<'A'|'B'|'C'|'D'>('A')
  

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
        <div className="flex absolute top-2 justify-center items-center break-all gap-2 p-2 border rounded-md border-slate-600 bg-gray-700 bg-opacity-90 mx-2">
          <p className="text-amber-700 italic font-bold break-words w-full">
            Please Update Your Detail From{" "}
            <span className="text-sky-500">Profile</span> For Better Experience.
          </p>
          <div
            className="flex justify-center items-center p-1 bg-gray-500 bg-opacity-30 rounded-md cursor-pointer"
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
      <div className=" flex flex-col xl:w-3/6 lg:w-4/6 md:w-4/5 sm2:w-5/6 xxs:w-full  max-h-full rounded-md p-2">
        <div className="flex justify-center items-center p-3 w-full">
          <div className=" w-2/6">
            <button
              className=" p-2 bg-red-600 rounded-l-lg transition hover:bg-red-700 w-full"
              onClick={() => {
                router.push("dashboard/freshers");
              }}
            >
              <p>Freshers</p> 
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
        <div className="relative w-full my-2  h-full p-2 bg-gradient-to-br from-gray-800 via-slate-800 rounded-md">
          <div className="flex justify-center items-center">
            <div className="flex justify-start items-center xxs:mt-2 sm:mt-0 ">
              <button
                onClick={() => {
                  setView("A");
                }}
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className="cursor-pointer flex justify-center flex-col items-center text-black bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-5 py-1 rounded-l-lg text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-2/6 "
                type="button"
              >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
                <p>Home</p>
              </button>
              <button
                onClick={() => {
                  setView("D");
                }}
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className="cursor-pointer flex flex-col justify-center items-center text-black bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium text-sm px-5 py-1 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 w-2/6"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
                <p>You</p>

              </button>
              <button
                onClick={() => {
                  setView("B");
                }}
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className="cursor-pointer flex justify-center flex-col items-center text-black bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium text-sm px-5 py-1 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 w-2/6"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" className="size-6" >
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                </svg>
                <p>New</p>

              </button>
              <button
                onClick={() => {
                  setView("C");
                }}
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className="relative flex justify-center flex-col items-center gap-1 cursor-pointer  text-black bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium  text-sm px-5 rounded-r-lg py-3.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 w-2/6"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
                  <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
                </svg>
                <div className=" absolute top-1 right-2 flex justify-start items-center">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
                    <span className="relative flex justify-center items-center rounded-full h-4 w-4 bg-rose-500 text-center text-white animate-pulse">{Requests.length}</span>
                  </span>
                </div>

              </button>
              
            </div>
          </div>
          {
            View==='A'?
              (<div className="mt-2">
                <PostFeed/>
              </div>)
            :View==='C'? 
              (<div className="bg-teal-950 flex flex-col w-full gap-2 rounded-md p-2 h-4/5 md:px-12 mt-2">
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
              </div>)
            :View==='B'? 
              ( <div className="mt-2">
                  <CreatePost userId={userId} setView={setView}/>
              </div>  )

            : <div className="mt-2"> 
                <OwnPost userId={userId}/>
            </div>


          }
          
        </div>

        
      </div>
    </div>
  );
};


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
