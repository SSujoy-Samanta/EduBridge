import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";
export async function PUT(req: NextRequest) {
  const { userId, age } = await req.json();
  const id = parseInt(userId);
  if (!id && !age) {
    return NextResponse.json(
      { msg: "user Id and age required" },
      { status: 400 },
    );
  }
  try {
    const exit = await client.user.findFirst({
      where: {
        id: id,
        age: age.toString(),
      },
    });
    if (exit) {
      return NextResponse.json(
        { msg: "The age of user already Exit" },
        { status: 403 },
      );
    }
    const user = await client.user.update({
      where: {
        id: id,
      },
      data: {
        age: age.toString(),
      },
    });
    if (!user) {
      return NextResponse.json({ msg: "Invalid Information" }, { status: 411 });
    }
    return NextResponse.json(
      { msg: "Age Update successfull" },
      { status: 202 },
    );
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
