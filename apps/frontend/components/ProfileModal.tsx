'use client'
import {signOut } from "next-auth/react";
import { useRouter } from "next/navigation"
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";
import { SecondaryButton } from "./Buttons/SecondaryButton";
import { PrimaryButton } from "./Buttons/PrimaryButton";
export const ProfileModal = ({ setToggle,username,email }: {
     setToggle: React.Dispatch<React.SetStateAction<boolean>>
     username:string
     email:string
 }) => {
    const setNotification = useSetRecoilState(notificationState);
    const router=useRouter();
    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setToggle(prev => !prev);
    };

    const handleClickInside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    };
    const openLinkInNewTab = (url: string) => {
      window.open(url, '_blank');
    };
  return (
    <div
      id="popup-modal"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      onClick={handleClickOutside}
    >
      <div
        className="absolute right-0 sm:p-4 top-16 xxs:pl-12 w-full max-w-md max-h-full"
        onClick={handleClickInside}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-stone-900 w-5/6">
          <div className="p-4 md:p-5  flex flex-col gap-3">
            <div className="flex items-center gap-2 border rounded-md border-teal-900 p-2">
                <div className="w-10 h-10 rounded-full p-2 bg-cyan-600 text-center">{username.toUpperCase()[0]}</div>
                <div className="flex flex-col gap-1 justify-start ">
                    <div>{username}</div>
                    <div>{email}</div>
                </div>
            </div>
            <button
              type="button"
              className=" p-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() =>{
                 setToggle(x=>!x);
                 router.push('/dashboard/profile');
            }}
            >
                <div className="flex gap-2 items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <p>Profile</p>
                </div>
            </button>
            <button className='rounded-md bg-sky-600 p-2 w-full hover:bg-sky-700 transition ' onClick={()=>{
              setToggle(x=>!x);
              openLinkInNewTab(`/videocall`);
            }}>
              <div className="flex justify-start items-center gap-2 ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                  <path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z" />
                  </svg>
                  <p className="text-white">Start Metting</p>
              </div>
            </button>
            <div className="flex gap-2 sm:hidden xxs:flex xxs:flex-col-reverse flex-col-reverse">
              <SecondaryButton onClick={()=>{
                  setToggle(x=>!x);
                  router.push("/room")
                }}>
                <div className="flex items-center">
                      <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                      <path fillRule="evenodd" d="M10 3c-4.31 0-8 3.033-8 7 0 2.024.978 3.825 2.499 5.085a3.478 3.478 0 0 1-.522 1.756.75.75 0 0 0 .584 1.143 5.976 5.976 0 0 0 3.936-1.108c.487.082.99.124 1.503.124 4.31 0 8-3.033 8-7s-3.69-7-8-7Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-2-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                      </svg>
                      <p className="text-white text-base">Chat</p>
                      </div>
                </div>
              </SecondaryButton>
              <PrimaryButton onClick={()=>{
                 setToggle(x=>!x);
                 router.push("/dashboard")
                }}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM14 14h7v7h-7v-7zM3 14h7v7H3v-7z" />
                  </svg>
                </div>
                <p className="text-white text-base ">
                Dashboard</p></PrimaryButton>
            </div>
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm flex  items-center text-center p-2"
              onClick={async() => {
                    await signOut();
                    setToggle(x=>!x);
                    setNotification({ msg: "Loged out Successfull", type: "success" });
                    
              }}
            >
               <div className="flex gap-2 items-center">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-log-out "><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                    </div>
                    <p>Logout</p>
                </div>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};
