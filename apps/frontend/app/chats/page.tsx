import { Chating } from "@/components/Chating";
export default async function Chats({ searchParams }: { searchParams: { room: string,userId:string } }){
    //console.log(searchParams);
    const {room,userId}=searchParams;
    if(!room || !userId){
        return <div className="felx justify-center items-center text-red-500">Room Name And UserId Required </div>
    }
    return <div className="pt-8 flex justify-center items-center">
        <Chating room={room} userId={parseInt(userId)}/>
    </div>
}