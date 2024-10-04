import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    const userId = parseInt(id || "");
    if (!userId) {
      return NextResponse.json({ msg: "uder id Required" }, { status: 400 });
    }
    const userDetail = await client.user.findFirst({
      where: { id: userId },
      include: {
        school: { select: { name: true, degree: true } },
        college: { select: { name: true, degree: true } },
      },
    });
    if (!userDetail) {
      return NextResponse.json({ msg: "No data Found" }, { status: 411 });
    }
    return NextResponse.json({ userDetail }, { status: 202 });
  } catch (error: any) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({ msg: "Internal Server error" }, { status: 500 });
  }
}
