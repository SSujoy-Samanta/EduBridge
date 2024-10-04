import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("id");
    if (!userId) {
      return NextResponse.json({ msg: "user id required" }, { status: 404 });
    }
    const Id = parseInt(userId);
    const friendships = await client.friendship.findMany({
      where: {
        OR: [
          { senderId: Id, status: "ACCEPTED" },
          { receiverId: Id, status: "ACCEPTED" },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            affiliates: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            affiliates: true,
          },
        },
      },
    });

    const friends = friendships.map((friendship) => {
      return friendship.senderId === Id
        ? friendship.receiver
        : friendship.sender;
    });

    return NextResponse.json({ data: friends }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
