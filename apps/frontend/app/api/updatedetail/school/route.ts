import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  //console.log(body)
  if (!body.userId || !body.name || !body.degree) {
    return NextResponse.json(
      { msg: "userId Or Name Required" },
      { status: 404 },
    );
  }
  try {
    const school = await client.school.findFirst({
      where: {
        AND: [
          { name: body.name.toString() },
          { userId: parseInt(body.userId) },
          { degree: body.degree.toString() },
        ],
      },
    });
    if (school) {
      return NextResponse.json(
        { msg: "School Name Already Exist" },
        { status: 411 },
      );
    }
    await client.school.create({
      data: {
        name: body.name,
        userId: parseInt(body.userId),
        degree: body.degree,
      },
    });
    return NextResponse.json(
      { msg: "School Name Adding Successfull" },
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
    const school = await client.school.findFirst({
      where: {
        AND: [
          { name: body.name.toString() },
          { userId: parseInt(body.userId) },
          { degree: body.degree.toString() },
        ],
      },
    });

    if (!school) {
      return NextResponse.json(
        { msg: "School name does not exist" },
        { status: 404 },
      );
    }

    // Delete the school recor
    await client.school.deleteMany({
      where: {
        AND: [
          { name: body.name.toString() },
          { userId: parseInt(body.userId) },
          { degree: body.degree.toString() },
        ],
      },
    });

    return NextResponse.json(
      { msg: "School name deletion successful" },
      { status: 200 },
    );
  } catch (e: any) {
    console.error("Error deleting school:", e);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
