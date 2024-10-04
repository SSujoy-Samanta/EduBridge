import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract senderId and receiverId from query parameters
    const senderId = req.nextUrl.searchParams.get("senderId");
    const receiverId = req.nextUrl.searchParams.get("receiverId");

    if (!senderId || !receiverId) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    // Find the pending friend request
    const request = await client.friendship.findFirst({
      where: {
        OR: [
          { senderId: parseInt(senderId), receiverId: parseInt(receiverId) }, // Friend request from      sender to receiver
          { senderId: parseInt(receiverId), receiverId: parseInt(senderId) }, // Friend request from receiver to sender
        ],
      },
      select: {
        status: true,
        receiverId: true,
        senderId: true,
      },
    });

    if (!request) {
      return NextResponse.json({ result: request });
    }

    return NextResponse.json({ result: request }, { status: 200 });
  } catch (error) {
    console.error("Error fetching friend request status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
