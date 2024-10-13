import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";

// GET request to fetch posts with pagination (20-30 posts at a time)
export async function GET(req: NextRequest) {
  // Extract query parameters for pagination (default page = 1, limit = 20)
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  // Skip is calculated based on the page number
  const skip = (page - 1) * limit;

  try {
    // Fetch posts with pagination, ordered by creation date
    const posts = await client.post.findMany({
      skip,
      take: limit,
      include: {
        author: {
            select:{
                name:true,
                affiliates:true,
                id:true
            }
        },
      },
      orderBy: {
        createdAt: "desc", // Newest posts first
      },
    });

    // Fetch total number of posts for pagination metadata
    const totalPosts = await client.post.count();
    const totalPages = Math.ceil(totalPosts / limit);

    // Return posts along with pagination data
    return NextResponse.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNextPage: page < totalPages,
      },
    }, { status: 200 });

  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { postId, type } = await req.json();

  // Check if postId and type are provided
  if (!postId || !type || !["increment", "decrement"].includes(type)) {
    return NextResponse.json({ msg: "Invalid postId or type" }, { status: 400 });
  }

  try {
    // Find the post by postId
    const post = await client.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ msg: "Post not found" }, { status: 404 });
    }

    // Determine the new like count
    const updatedLikes =
      type === "increment" ? post.like + 1 : post.like > 0 ? post.like - 1 : 0;

    // Update the post's like count
    const updatedPost = await client.post.update({
      where: { id: postId },
      data: {
        like: updatedLikes,
      },
    });

    // Return the updated post data
    return NextResponse.json({ msg: "Like count updated", post: updatedPost }, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}