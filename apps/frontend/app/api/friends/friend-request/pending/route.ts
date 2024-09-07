import client from '@repo/db/client'
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const receiverId=req.nextUrl.searchParams.get("id");
    if(!receiverId){
        return NextResponse.json({msg:"user id required"},{status:404});
    }
    const PendingReq=await client.friendship.findMany({
        where: {
            receiverId:parseInt(receiverId),
            status:"PENDING",
          },
          include: {
            sender: true, // Include sender details
        },
    });
    if(!PendingReq){
        return NextResponse.json({msg:"No Pending Request"},{status:404});
    }
    return NextResponse.json(
        {
        data:PendingReq
        },
        {
            status:201
        }
    )
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: "Internal server error" },
      { status: 500 }
    );
  }
}
