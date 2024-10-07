import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";
import { OtpSchema } from "@repo/common/signUpSchema";

export async function POST(req: NextRequest) {
    const {email,otp}=await req.json();
    if (!email && !otp) {
        return NextResponse.json({ msg: "Email & otp is Required" }, { status: 400 });
    }

    try {
        // Validate email using the OtpSchema
        const parsedOtp = OtpSchema.safeParse({ email,otp});
        if (!parsedOtp.success) {
            return NextResponse.json({ msg: "Invalid Email or Otp" }, { status: 400 });
        }

        const foundOtp = await client.otp.findFirst({
            where: {
                OTP: parsedOtp.data.otp // Ensure the OTP is parsed as an integer
            }
        });

        if (foundOtp) {
            const expire = foundOtp.expired;
            const now = new Date();

            // Check if the OTP has expired
            if (expire <= now) {
                return NextResponse.json({ msg: "OTP Expired" }, { status: 411 });
            }
            // OTP is valid and not expired, update the user
            else{
                return NextResponse.json({ msg: 'continue to update Password' }, { status: 201 });
            }
            
        } else {
            // OTP not found
            return NextResponse.json({ msg: "OTP not matched" }, { status: 404 });
        }
        // return NextResponse.json({ msg:'OTP Sent Successfully'}, { status: 200 });

    } catch (e: any) {
        return NextResponse.json({ msg: "Internal server Error", error: e.message }, { status: 500 });
    }
}
