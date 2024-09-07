'use client'
import { SecondaryButton } from "./Buttons/SecondaryButton"
import {useState} from 'react'
export const RoomDetails=({name,passkey,onClick}:{
    name:string,
    passkey:string |null,
    onClick:()=>void
})=>{
    const [key,setKey]=useState<boolean>(false)
    return <div className="flex w-2/5 p-2 gap-2 justify-between items-center border rounded-md border-zinc-800 hover:bg-slate-800">
        <div className="flex gap-2 w-full">
            <div className="rounded-md flex justify-center items-center w-14 bg-slate-900 border border-teal-800"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="text-rose-600 flex  gap-1 flex-col w-full">
                <div className="border border-cyan-900 flex justify-center items-center text-center p-1 rounded-md w-full">{name}</div>
                <div className="flex items-center gap-2 font-mono text-slate-800">
                    <div className="bg-cyan-700 p-1 rounded-sm cursor-pointer" onClick={()=>{setKey(x=>!x)}}>
                        Passkey
                    </div>
                    {key && <div className="p-1 rounded-sm bg-sky-900 text-white">{passkey}</div>}
                </div>
            </div>
        </div>
        <div className="pl-8">
            <SecondaryButton onClick={()=>{}}><p className="text-black">Chat</p></SecondaryButton>
        </div>
    </div>
}