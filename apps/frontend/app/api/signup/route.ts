import { signUpSchema } from "@repo/common/signUpSchema";
import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the JSON body
    const parseBody = signUpSchema.safeParse(body); // Validate using the schema

    if (!parseBody.success) {
      return NextResponse.json(
        { msg: "Wrong Inputs", errors: parseBody.error.errors },
        { status: 411 },
      );
    }

    //console.log("Parsed Body:", parseBody);

    const user = await client.user.findFirst({
      where: {
        email: parseBody.data.email,
      },
    });
    const isVeified= await client.verifyEmail.findFirst({
      where:{
        AND:{
          email: parseBody.data.email,
          verified:true,
        }
      }
    })

    if (user) {
      return NextResponse.json(
        { msg: "This user already exists!" },
        { status: 403 },
      );
    }
    if(!isVeified){
      return NextResponse.json(
        { msg: "Please Veify your Email First!" },
        { status: 403 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(parseBody.data.password, salt);

    console.log("Creating new user...");
    const newUser = await client.user.create({
      data: {
        name: parseBody.data.username,
        email: parseBody.data.email,
        password: hashPassword,
        mobile: parseBody.data.mobile,
        affiliates: parseBody.data.affiliates,
        age: parseBody.data.age,
        currDegree: parseBody.data.currDegree,
        pastDegree: parseBody.data.pastDegree,
        verified:true
      },
    });

    console.log("User created, creating address...");
    const newAddress = await client.address.create({
      data: {
        country: parseBody.data.country,
        state: parseBody.data.state,
        city: parseBody.data.city,
        userId: newUser.id,
      },
    });

    //console.log("Address created:", newAddress);

    return NextResponse.json({ msg: "Signup successful" }, { status: 200 });
  } catch (error) {
    console.error("Error occurred during signup:", error); // Log the actual error
    return NextResponse.json({ msg: "An error occurred" }, { status: 500 });
  }
}
