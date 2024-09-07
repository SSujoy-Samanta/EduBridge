import client from '@repo/db/client'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); 
        const { senderId,receiverId } = body;
    
        // Find the pending friend request
        const request = await client.friendship.findFirst({
          where: {
            OR: [{  senderId: parseInt(senderId),receiverId:parseInt(receiverId)} , // Friend request from      sender to receiver
              { senderId: parseInt(receiverId), receiverId: parseInt(senderId) }, // Friend request from receiver to sender
            ],
          },
        });
    
        if (!request) {
          return NextResponse.json({ error: "No friend request found." }, { status: 400 });
        }
        await client.friendship.delete({
            where:{
              id:request.id
            }
        })
    
        return NextResponse.json({msg:"Friend Request Decline Successfully"}, { status: 200 });
      } catch (error) {
        console.error("Error declining friend request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
}
