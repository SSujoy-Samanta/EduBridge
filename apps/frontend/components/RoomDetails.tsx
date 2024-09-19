'use client'
import axios from "axios"
import { SecondaryButton } from "./Buttons/SecondaryButton"
import React, {useState} from 'react'
import { useSetRecoilState } from 'recoil';
import { notificationState } from '@/lib/atom';
const apiUrl=process.env.NEXT_PUBLIC_API_URL
export const RoomDetails=({name,passkey,roomId,userId,setGroupCreated}:{
    name:string,
    passkey:string |null,
    roomId:number,
    userId:number,
    setGroupCreated: React.Dispatch<React.SetStateAction<boolean>>;
})=>{
    const setNotification=useSetRecoilState(notificationState);
    const [key,setKey]=useState<boolean>(false)
    const [isCopied, setIsCopied] = useState(false);
    const handleCopy = async (text:string) => {
        try {
          await navigator.clipboard.writeText(text);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (error) {
          console.error("Failed to copy: ", error);
        }
    };
    const openLinkInNewTab = (url: string) => {
        window.open(url, '_blank');
    };
    return <div className="flex w-3/4 p-2 gap-2 items-center border rounded-md border-zinc-800 hover:bg-slate-800">
        <div className="flex gap-2 w-full  items-center">
            <div className="rounded-full flex justify-center items-center w-14 h-12 bg-slate-900 border border-teal-800"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="text-rose-600 flex  gap-1 flex-col w-full">
                <div className=" flex justify-start items-center text-center p-1 rounded-md ">{name.toLocaleUpperCase()}</div>
                <div className="flex items-center gap-2 font-mono text-slate-800">
                    <div className="bg-cyan-700 p-1 rounded-md cursor-pointer text-sm" onClick={()=>{setKey(x=>!x)}}>
                        Passkey
                    </div>
                    <button 
                        onClick={()=>{if(passkey){
                            handleCopy(passkey)
                        }}} 
                        className="p-1 bg-stone-800 text-white text-sm px-2 rounded-md hover:bg-stone-900 transition"
                    >
                        {isCopied ? "Copied!" :<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"      fill="white" className="size-5">
                            <path fillRule="evenodd" d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                            </svg>
                        }
                    </button>
                    {key && <div className="p-1 rounded-sm bg-sky-900 text-sm text-white">{passkey}</div>}
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center gap-2">
            <SecondaryButton onClick={()=>{
                openLinkInNewTab(`/chats?room=${name}&userId=${userId}`);
            }}><p className="text-black">Chat</p></SecondaryButton>
            <button className="border border-slate-900 rounded-md p-2 text-sm bg-rose-400 text-black hover:bg-pink-600 transition" onClick={async()=>{
                try {
                    const res=await axios.post(`${apiUrl}/room/leaveroom`,{
                        roomId:roomId,
                        userId:userId
                    })
                    setGroupCreated(x=>!x);
                    setNotification({msg:res.data.msg,type:"success"});
                } catch (error:any) {
                    setNotification({msg: error.response?.data.msg || "Error while Room Leaving",type:"success"})
                }
            }}>Leave</button>
        </div>
    </div>
}