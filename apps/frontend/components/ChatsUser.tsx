'use client'
import axios from "axios";
import { useEffect, useState } from "react"
const apiUrl=process.env.NEXT_PUBLIC_API_URL
export const Chatuser=({room,userId}:{room:string,userId:number})=>{
    const [users, setUsers] = useState<{ name: string,id:number }[]>([]);
    const [creator,setCreator]=useState<number>();
    useEffect(()=>{
       try {
        if(room){
            axios.get(`${apiUrl}/room/getusers?room=${room}`)
            .then((response) => {
                setUsers(response.data.users); // Assuming the response structure contains `users`
                setCreator(response.data.creator)
                console.log(creator)
            })
        }
       } catch (error:any) {
        console.log("Error while Fetching users name")
       }
    },[room,userId])
    const sortedUsers = [...users].sort((a, b) => (a.id === userId ? -1 : b.id === userId ? 1 : 0));
    return <div className="flex flex-col gap-2">
        {
            
            sortedUsers.length > 0 ? sortedUsers.map((x:any,ind:number)=>{
                return <div key={ind} className="flex gap-2 justify-between items-center border border-zinc-800 p-2 rounded-md">
                   <div className="flex items-center gap-2">
                        <div className="p-1 text-center bg-amber-900 border rounded-md w-8 h-8 border-gray-900 text-black font-bold">{x.name.toUpperCase()[0]}</div>
                        <div>{x.id===userId?"You":x.name}</div>
                   </div>
                   {
                        creator && creator===x.id && <div className="text-center text-teal-600 font-light text-sm">Admin</div>
                   }
                </div>
                })
            : 
                <div className="flex justify-center items-center text-xl text-red-700">
                    No User Present
                </div>
        }
    </div>
}