import { Room } from "@/components/Room";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import client from "@repo/db/client"
export default async function RoomServer(){
    const session=await getServerSession(NEXT_AUTH);
    if (!session) {
        return <div>Please log in to view your friends list.</div>;
    }
    const userId = parseInt(session.user.id);
    const userRooms=await client.room.findMany({
        where:{
            users:{
                some:{
                    id:userId
                }
            }
        }
    })
    if (!userRooms) {
        return <div className="text-center pt-10 text-red-700 w-full">No rooms found for this user.</div>;
      }
    
    return <div className="flex gap-2 w-full"> 
        <Room userId={userId} userRooms={userRooms}/>
    </div>
}