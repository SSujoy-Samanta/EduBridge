import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client"
export async function POST(req:NextRequest) {
    const body=await req.json();
    const{roomId ,userId}=body;
    if(!roomId && !userId){
        return NextResponse.json({msg:"Room name And user id Required"},{status:400});
    }
    try {
        await client.room.update({
            where:{
                id:parseInt(roomId)
            },
            data: {
                users: {
                  disconnect: { id: parseInt(userId)},
                },
            },
        })
        return NextResponse.json({msg:"Leaving Successfull"},{status:201})
    } catch (error) {
        return NextResponse.json({msg:"Internal Server Error"},{status:500})
    }
}