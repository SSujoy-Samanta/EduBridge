import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.userId || !body.name || !body.degree) {
    return NextResponse.json(
      { msg: "userId Or Name Required" },
      { status: 404 },
    );
  }
  try {
    console.log("body::" + body.name);
    const college = await client.college.findFirst({
      where: {
        AND: [
          { name: body.name.toString() },
          { userId: parseInt(body.userId) },
          { degree: body.degree.toString() },
        ],
      },
    });
    console.log(college);
    if (college) {
      return NextResponse.json(
        { msg: "College Name Already Exist" },
        { status: 411 },
      );
    }
    await client.college.create({
      data: {
        name: body.name,
        userId: parseInt(body.userId),
        degree: body.degree,
      },
    });
    return NextResponse.json(
      { msg: "College Name Adding Successfull" },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  // Validate required fields
  if (!body.userId || !body.name || !body.degree) {
    return NextResponse.json(
      { msg: "userId or Name is required" },
      { status: 400 },
    );
  }

  // Parse userId safely
  const userId = parseInt(body.userId, 10);
  if (isNaN(userId)) {
    return NextResponse.json({ msg: "Invalid userId" }, { status: 400 });
  }

  try {
    // Check if user has the school with the given name
    const college = await await client.college.findFirst({
      where: {
        AND: [
          { name: body.name.toString() },
          { userId: parseInt(body.userId) },
          { degree: body.degree.toString() },
        ],
      },
    });

    if (!college) {
      return NextResponse.json(
        { msg: "College name does not exist" },
        { status: 404 },
      );
    }

    // Delete the college record
    await client.college.deleteMany({
      where: {
        AND: [
          { name: body.name.toString() },
          { userId: parseInt(body.userId) },
          { degree: body.degree.toString() },
        ],
      },
    });

    return NextResponse.json(
      { msg: "College name deletion successful" },
      { status: 200 },
    );
  } catch (e: any) {
    console.error("Error deleting College:", e);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
