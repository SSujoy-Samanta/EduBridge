import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";
import { PasswordSchema } from "@repo/common/signUpSchema";
import bcrypt from "bcrypt";
export async function PUT(req: NextRequest) {
    // Parse the JSON request body
    const { email, password, otp } = await req.json();

    // Validate required fields
    if (!email || !password || !otp) {
        return NextResponse.json(
            { msg: "Email, password, and OTP are required" },
            { status: 400 }
        );
    }

    try {
        // Validate inputs using Zod or a similar schema validation library
        const parseData = PasswordSchema.safeParse({ email, password, otp });

        if (!parseData.success) {
            return NextResponse.json(
                { msg: "Invalid Inputs", errors: parseData.error.errors },
                { status: 422 }
            );
        }

        // Check if the user exists with the provided email
        const user = await client.user.findFirst({
            where: {
                email: parseData.data.email,
            },
            include: {
                otp: true, // Assuming the OTP is associated with the user
            },
        });

        // If user doesn't exist
        if (!user) {
            return NextResponse.json(
                { msg: "Invalid email" },
                { status: 403 }
            );
        }

        // Check if the OTP is valid and not expired
        const userOtp = user.otp; // Assuming `otp` is associated with the user
        if (!userOtp || userOtp.OTP !== parseData.data.otp) {
            return NextResponse.json(
                { msg: "Invalid OTP" },
                { status: 403 }
            );
        }
        // Check if the OTP has expired
        const expire = userOtp.expired;
        const now = new Date();
        // Check if the OTP has expired
        if (expire <= now) {
            return NextResponse.json({ msg: "OTP Expired" }, { status: 411 });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(parseData.data.password, salt);
        // Update the password
        const updatedUser = await client.user.update({
            where: {
                email: parseData.data.email,
            },
            data: {
                password: hashPassword,
            },
        });

        if (!updatedUser) {
            return NextResponse.json(
                { msg: "Failed to update password" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { msg: "Password updated successfully" },
            { status: 200 }
        );
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}
