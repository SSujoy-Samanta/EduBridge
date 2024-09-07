import { NextRequest, NextResponse } from "next/server";
import client from '@repo/db/client';
import { validateRoomName } from "@/lib/room/validRoomName";

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        // Destructure passkey and userId from the body
        const { passkey, userId }: { passkey: string, userId: number } = body;

        // Validate passkey and userId
        if (!passkey) {
            return NextResponse.json(
                { msg: "Passkey is required" },
                { status: 400 }
            );
        }
        if(!validateRoomName(passkey) || passkey.length<10){
            return NextResponse.json(
                { msg: "Passkey is Invalid" },
                { status: 411 }
            );
        }
        if (!userId) {
            return NextResponse.json(
                { msg: "User ID is required" },
                { status: 400 }
            );
        }
        const Room=await client.room.findUnique({
            where:{
                passkey:passkey
            },
            select:{
                id:true,
                name:true,
                createdBy:true
            }
        })
        if(!Room){
            return NextResponse.json(
                { msg: "No Room Existed" },
                { status: 400 }
            );
        }
        return NextResponse.json({ msg: "Success", result:Room }, { status: 200 });
    } catch (error) {
        console.error("Error in POST handler:", error);
        return NextResponse.json(
            { msg: "Internal server error" },
            { status: 500 }
        );
    }
}
