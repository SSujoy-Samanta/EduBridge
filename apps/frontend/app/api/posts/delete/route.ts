import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client"; // Assuming you have Prisma client configured here
import { deleteImage } from "@/utils/Image_uploader";

export async function DELETE(req: NextRequest) {
    try {
        // Extract postId from the request params
        const postId = req.nextUrl.searchParams.get("postId");

        // Validate the postId
        if (!postId || isNaN(parseInt(postId))) {
            return NextResponse.json({ msg: "Valid Post ID is required" }, { status: 400 });
        }

        // Check if the post exists
        const existingPost = await client.post.findUnique({
            where: { id: parseInt(postId) },
        });

        if (!existingPost) {
            return NextResponse.json({ msg: "Post not found" }, { status: 404 });
        }

        // Attempt to delete image if post has one
        if (existingPost.imageUrl && existingPost.public_id) {
            try {
                const result = await deleteImage(existingPost.public_id);
                if (result !== 'ok') {
                    console.warn(`Failed to delete image with public_id: ${existingPost.public_id}`);
                }
            } catch (error:any) {
                console.error(`Error deleting image: ${error.message}`);
                // Log the error, but allow the post to be deleted regardless
            }
        }

        // Delete the post from the database
        await client.post.delete({
            where: { id: parseInt(postId) },
        });

        // Return success response
        return NextResponse.json({ msg: "Post deleted successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("Error deleting post:", error.message);
        return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
    }
}
