import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  //console.log(id);

  try {
    if (id) {
      const alumni = await client.user.findMany({
        where: {
          affiliates: "alumni",
          id: {
            not: parseInt(id),
          },
        },
        select: {
          id: true,
          name: true,
          currDegree: true,
          pastDegree: true,
          address: { select: { state: true, city: true } },
        },
      });

      if (alumni.length === 0) {
        return NextResponse.json(
          {
            msg: "No Alumni Data found",
          },
          { status: 403 },
        );
      }

      return NextResponse.json({
        alumni: alumni,
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
