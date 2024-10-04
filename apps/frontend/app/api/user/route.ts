import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    if (id) {
      const user = await client.user.findFirst({
        where: {
          id: parseInt(id),
        },
        select: {
          id: true,
          name: true,
          email: true,
          currDegree: true,
          pastDegree: true,
          affiliates: true,
          school: { select: { name: true, degree: true } },
          college: { select: { name: true, degree: true } },
          address: { select: { country: true, state: true, city: true } },
          sentFriendships: { select: { status: true } },
        },
      });
      if (!user) {
        return NextResponse.json(
          {
            msg: "No Alumni Data found",
          },
          { status: 404 },
        );
      }

      return NextResponse.json({
        user: user,
      });
    } else {
      return NextResponse.json(
        {
          msg: "ID parameter is required",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error fetching alumni data:", error);
    return NextResponse.json(
      {
        msg: "Internal server error",
      },
      { status: 500 },
    );
  }
}
