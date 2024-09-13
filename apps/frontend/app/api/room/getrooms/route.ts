import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client"
export async function GET(req:NextRequest){
    const userId=req.nextUrl.searchParams.get("id");
    if(!userId){
        return NextResponse.json({msg:"user id Required"},{status:400})
    }
    try {
        const userRooms=await client.room.findMany({
            where:{
                users:{
                    some:{
                        id:parseInt(userId)
                    }
                }
            }
        })
        if(!userRooms){
            return NextResponse.json({msg:"No Rooms Found"},{status:411})
        }
        return NextResponse.json({userRooms},{status:201})
    } catch (error) {
        return NextResponse.json({msg:"internal server error"},{status:500})
    }
}