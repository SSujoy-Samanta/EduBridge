import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";
export async function PUT(req: NextRequest) {
  const { userId, name } = await req.json();
  const id = parseInt(userId);
  if (!id && !name) {
    return NextResponse.json(
      { msg: "user Id and username required" },
      { status: 400 },
    );
  }
  try {
    const exit = await client.user.findFirst({
      where: {
        id: id,
        name: name.toString(),
      },
    });
    if (exit) {
      return NextResponse.json(
        { msg: "The name of user already Exit" },
        { status: 403 },
      );
    }
    const user = await client.user.update({
      where: {
        id: id,
      },
      data: {
        name: name.toString(),
      },
    });
    if (!user) {
      return NextResponse.json({ msg: "Invalid Information" }, { status: 411 });
    }
    return NextResponse.json(
      { msg: "Name Update successfull" },
      { status: 202 },
    );
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
