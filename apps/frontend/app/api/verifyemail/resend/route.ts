import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";
import { OtpEmailSchema } from "@repo/common/signUpSchema";
import { OTP_GEN } from "@/utils/genOtp";
import { sendEmail } from "@/utils/sendMail";

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email");

    if (!email ) {
        return NextResponse.json({ msg: "Email  is Required" }, { status: 400 });
    }

    try {
        // Validate email using the OtpEmailSchema
        const parsedEmail = OtpEmailSchema.safeParse({ email });
        if (!parsedEmail.success) {
            return NextResponse.json({ msg: "Invalid Email " }, { status: 400 });
        }

        // Find user by email
        const user = await client.user.findFirst({
            where: {
                email: parsedEmail.data.email,
            },
        });

        // Check if user was found
        if (user) {
            return NextResponse.json({ msg: "Email Already Exist" }, { status: 403 });
        }

        
        const otp=OTP_GEN(6);
        const existingOtp = await client.verifyEmail.findFirst({
            where: {
                email: parsedEmail.data.email,
            }
        });
        const expirationDuration = 5 * 60 * 1000; 
        if (existingOtp) {
            // Update the existing OTP record
            await client.verifyEmail.update({
                where: {
                    id: existingOtp.id
                },
                data: {
                  OTP:otp,
                  created: new Date(),
                  expired: new Date(new Date().getTime() + expirationDuration) 
                }
            });
        } else {
            // Create a new OTP record
            await client.verifyEmail.create({
                data: {
                    OTP:otp,
                    created: new Date(),
                    expired: new Date(new Date().getTime() + expirationDuration),
                    email: parsedEmail.data.email
                }
            });
        }
        const message = "VERIFICATION OF EMAIL";
        const success=await sendEmail(otp, parsedEmail.data.email, `EDUBRIDGE: ${message}`);
        if(!success){
            return NextResponse.json({ msg:'OTP Sent Unsuccessfully'}, { status: 200 });
        }
        return NextResponse.json({ msg:'OTP Sent Successfully'}, { status: 200 });

    } catch (e: any) {
        console.log("Error:"+e)
        return NextResponse.json({ msg: "Internal server Error", error: e.message }, { status: 500 });
    }
}
