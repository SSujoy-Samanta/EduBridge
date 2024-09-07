import client from '@repo/db/client'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    const { senderId, receiverId } = body;

    // Validate the request body
    if (!senderId || !receiverId) {
      return NextResponse.json(
        { msg: "Sender ID and Receiver ID are required." },
        { status: 400 }
      );
    }
    if(senderId===receiverId){
        return NextResponse.json(
            { msg: "You can't send friend request to yourself." },
            { status: 404 }
          );
    }

    // Check if the friend request already exists
    const existingRequest = await client.friendship.findFirst({
      where: {
        OR: [
          { senderId, receiverId }, // Friend request from sender to receiver
          { senderId: receiverId, receiverId: senderId }, // Friend request from receiver to sender
        ],
      },
    });

    if (existingRequest) {
      return NextResponse.json(
        { msg: "Friend request already sent." },
        { status: 400 }
      );
    }

    // Create a new friend request
    const newFriendRequest = await client.friendship.create({
      data: {
        senderId,
        receiverId,
        status: "PENDING", // Default to PENDING
      },
    });

    // Respond with the newly created friend request
    return NextResponse.json({ data: newFriendRequest }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: "Internal server error" },
      { status: 500 }
    );
  }
}

