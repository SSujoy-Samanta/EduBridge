import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";
import { PostSchema } from "@repo/common/signUpSchema";
import { uploadImage } from "@/utils/Image_uploader";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();

    const image = formData.get("image") as unknown as File;
    const content = formData.get("content") as unknown as string;
    const authorId = formData.get("authorId") as unknown as string;

    // console.log("image:", image);
    // console.log("content:", content);
    // console.log("authorId:", authorId);

    let imageUrl: string | null = null;
    let public_id: string | null = null;
    let data: any = null;

    // If there is an image, upload it to Cloudinary
    if (image) {
      try {
        data = await uploadImage(image, "Edubridge");
      } catch (uploadError:any) {
        console.error("Image upload failed:", uploadError);
        return NextResponse.json({ msg: "Image upload failed" }, { status: 500 });
      }
    }


    // Check if the image upload was successful and assign the URL
    if (data) {
      imageUrl = data.secure_url;
      public_id=data.public_id;
    }

    // Validate input using the PostSchema
    const postBody = PostSchema.safeParse({
      content,
      imageUrl,
      authorId: parseInt(authorId, 10), // Convert authorId to a number
    });

    if (!postBody.success) {
      return NextResponse.json({ msg: "Invalid Post" }, { status: 400 });
    }

    // Create the new post
    const newPost = await client.post.create({
      data: {
        content: postBody.data.content,
        imageUrl: imageUrl || null, // Use imageUrl from Cloudinary if available
        public_id:public_id || null,
        author: {
          connect: { id: postBody.data.authorId },
        },
      },
    });

    return NextResponse.json({ msg: "Post Successful", post: newPost }, { status: 201 });

  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ msg: "Failed to create post" }, { status: 500 });
  }
}
