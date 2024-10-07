import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";
import { MobileSchema } from "@repo/common/signUpSchema";
export async function PUT(req: NextRequest) {
    const { userId, mobile } = await req.json();
    const id = parseInt(userId);
    if (!id && !mobile) {
      return NextResponse.json(
        { msg: "user Id and mobile required" },
        { status: 400 },
      );
    }
    try {
      console.log(mobile);
      const parseMobile = MobileSchema.safeParse({ mobile });

      if (!parseMobile.success) {
        return NextResponse.json(
          { msg: "Wrong Inputs", errors: parseMobile.error.errors },
          { status: 411 },
        );
      }
      const exit = await client.user.findFirst({
        where: {
          id: id,
          mobile: mobile.toString(),
        },
      });
      if (exit) {
        return NextResponse.json(
          { msg: "The mobile no of user already Exit" },
          { status: 403 },
        );
      }
      const user = await client.user.update({
        where: {
          id: id,
        },
        data: {
          mobile: mobile.toString(),
        },
      });
      if (!user) {
        return NextResponse.json({ msg: "Invalid Information" }, { status: 411 });
      }
      return NextResponse.json(
        { msg: "mobile no Update successfull" },
        { status: 202 },
      );
    } catch (e: any) {
      console.log(e);
      return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}
