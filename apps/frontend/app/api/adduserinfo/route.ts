import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";
import { AddUserSchema } from "@repo/common/signUpSchema";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the JSON body
    const parseBody = AddUserSchema.safeParse(body); // Validate using the schema

    if (!parseBody.success) {
      return NextResponse.json(
        { msg: "Wrong Inputs", errors: parseBody.error.errors },
        { status: 411 },
      );
    }

    //console.log("Parsed Body:", parseBody);

    // Find the user by ID
    const user = await client.user.findFirst({
      where: {
        id: parseBody.data.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { msg: "This user does not exist!" },
        { status: 403 },
      );
    }

    // Update user details
    console.log("Updating user details...");
    const updatedUser = await client.user.update({
      where: {
        id: parseBody.data.id,
      },
      data: {
        affiliates: parseBody.data.affiliates,
        currDegree: parseBody.data.currDegree,
        pastDegree: parseBody.data.pastDegree,
      },
    });

    // Update address based on userId, assuming the address table links to userId
    console.log("Updating address...");
    const updatedAddress = await client.address.create({
      data: {
        country: parseBody.data.country,
        state: parseBody.data.state,
        city: parseBody.data.city,
        userId: parseBody.data.id,
      },
    });
    //console.log(updatedAddress);

    return NextResponse.json(
      { msg: "Information updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error occurred during information update:", error); // Log the actual error
    return NextResponse.json({ msg: "An error occurred" }, { status: 500 });
  }
}
