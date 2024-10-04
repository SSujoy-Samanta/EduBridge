import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get("room");

  if (!room) {
    return NextResponse.json({ msg: "Room name required" }, { status: 400 });
  }

  try {
    const roomData = await client.room.findFirst({
      where: {
        name: room,
      },
      include: {
        users: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    if (!roomData) {
      return NextResponse.json({ msg: "Room not found" }, { status: 404 });
    }
    return NextResponse.json(
      { users: roomData.users, creator: roomData.createdBy },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { msg: "Error fetching room data", error: error.message },
      { status: 500 },
    );
  }
}
