import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { senderId, receiverId } = body;

    // Find the pending friend request
    const request = await client.friendship.findUnique({
      where: { senderId_receiverId: { senderId, receiverId } },
    });

    if (!request || request.status !== "PENDING") {
      return NextResponse.json(
        { error: "No pending friend request found." },
        { status: 400 },
      );
    }
    const updatedRequest = await client.friendship.update({
      where: { id: request.id },
      data: { status: "ACCEPTED" },
    });

    return NextResponse.json({ data: updatedRequest }, { status: 200 });
  } catch (error) {
    console.error("Error declining friend request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
