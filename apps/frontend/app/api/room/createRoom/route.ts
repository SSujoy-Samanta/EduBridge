import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";
import { RoomSchema } from "@repo/common/signUpSchema";
import { validateRoomName } from "@/lib/room/validRoomName";
import { generatePasskey } from "@/lib/room/passkeyGeneration";

export async function POST(req: NextRequest) {
    // const roomName = req.nextUrl.searchParams.get("name");
    // const creatorId = parseInt(req.nextUrl.searchParams.get("id") || '');
    const body= await req.json();
    const {roomName,creatorId}: { roomName: string, creatorId: number }=body;
    // Ensure roomName is not null
    if (!roomName) {
        return NextResponse.json(
            { msg: "Room name is required" },
            { status: 400 }
        );
    }

    // Validate room name against schema
    const parseRoom = RoomSchema.safeParse({ roomName });
    if (!parseRoom.success || !creatorId) {
        return NextResponse.json(
            { msg: "Invalid inputs", errors: parseRoom.error?.errors || "Creator ID is missing" },
            { status: 411 }
        );
    }

    // Further validation of the room name (e.g., special characters)
    const isValidRoom = validateRoomName(parseRoom.data.roomName);
    if (!isValidRoom) {
        return NextResponse.json(
            { msg: "Room name is not valid" },
            { status: 411 }
        );
    }

    try {
        // Check if the room already exists
        let room = await client.room.findUnique({ where: { name: parseRoom.data.roomName } });

        if (!room) {
            const passkey=await generatePasskey();
            // Create the room if it doesn't exist and associate it with the creator
            room = await client.room.create({
                data: {
                    name: parseRoom.data.roomName,
                    createdBy: creatorId,
                    passkey:passkey,
                    users: {
                        connect: { id: creatorId }, // Add the creator to the users list
                    },
                },
            });
            return NextResponse.json({ msg: "Room created successfully", room }, { status: 201 });
        }else{
            return NextResponse.json({ msg: "Room already Existed", room }, { status: 403 });
        }

        
    } catch (error: any) {
        console.error(`Error creating room: ${error.message}`);
        return NextResponse.json(
            { msg: "Could not create room & Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
