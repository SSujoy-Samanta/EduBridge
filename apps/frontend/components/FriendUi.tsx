'use client'
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { RequestButton } from "./RequestButton";

interface User {
    id:number,
    name: string;
    email:string,
    affiliates:string
}
export const FriendUi=({friend,userId}:{friend:User,userId:number})=>{
    const router=useRouter();
    const {id,name,email,affiliates}=friend;
    return<div className=" flex gap-2 p-2 items-center border rounded-md border-neutral-800 justify-between hover:bg-gray-900 cursor-pointer">
    <div className="flex gap-2 p-2 w-5/6 h-full">
        <div className="flex justify-center items-center border rounded-md border-neutral-800 bg-slate-800 text-sky-600 p-2 h-full w-1/6 text-3xl">{name.toUpperCase()[0]}</div>
        <div className="flex flex-col gap-1">
            <div className="flex justify-center items-center border-2 rounded-sm border-cyan-950 p-1 font-medium bg-blue-900">{name.toUpperCase()}</div>
            <div className="flex gap-2 w-full">
                <div className="flex justify-start item-center gap-1">
                    <div className="p-2 border rounded-sm border-gray-800  text-center bg-cyan-700">Email</div>
                    <div className="p-2 border rounded-sm border-gray-800 ">{email}</div>
                </div>
                <div className="flex justify-start item-center gap-1">
                    <div className="p-2 border rounded-sm border-gray-800  text-center bg-green-800">Affiliates</div>
                    <div className="p-2 border rounded-sm border-gray-800 ">{affiliates}</div>
                </div>
            </div>
        </div>
    </div>
    <div className="flex flex-col p-2 gap-2 w-1/6">
        <PrimaryButton onClick={()=>{
            router.push(`/user/?id=${id}`);
        }}>Show</PrimaryButton>
        <RequestButton userId={userId} receiverId={id}/>
       
    </div>
</div>
}