import { NextRequest, NextResponse } from "next/server";
import client from '@repo/db/client';

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id");
    try {
        if (id) {
            const freshers = await client.user.findMany({
                where: {
                    affiliates: "freshers",
                    id: {
                        not: parseInt(id)
                    }
                },
                select: {
                    id:true,
                    name: true,
                    currDegree: true,
                    pastDegree: true,
                    address: { select: {state: true, city: true } }
                }
            });
            if (freshers.length === 0) {
                return NextResponse.json({
                    msg: "No Alumni Data found",
                }, { status: 404 });
            }

            return NextResponse.json({
                freshers: freshers
            });
        } else {
            return NextResponse.json({
                msg: "ID parameter is required",
            }, { status: 400 });
        }
    } catch (error) {
        console.error("Error fetching alumni data:", error);
        return NextResponse.json({
            msg: "Internal server error",
        }, { status: 500 });
    }
}
