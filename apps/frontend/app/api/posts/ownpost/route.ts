import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client"; // Assuming you have the Prisma client configured here

export async function GET(req: NextRequest) {
    try {
        // Extract the authorId (userId) from the query parameters
        const authorId = req.nextUrl.searchParams.get('userId');

        // Validate the authorId
        if (!authorId || isNaN(parseInt(authorId))) {
            return NextResponse.json({ msg: "Valid Author ID is required" }, { status: 400 });
        }

        // Fetch posts created by the user (authorId)
        const posts = await client.post.findMany({
            where: { authorId: parseInt(authorId) },
            orderBy: {
                createdAt: 'desc', // Order by latest posts first
            },
        });

        // Return posts as a response
        return NextResponse.json(posts, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching posts:", error.message);
        return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
    }
}
