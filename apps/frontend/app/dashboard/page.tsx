import { DashBoard } from "@/components/Dashboard";
import { NEXT_AUTH } from "@/lib/auth";
import client from "@repo/db/client";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
    try {
        const session = await getServerSession(NEXT_AUTH);

        if (!session || !session.user) {
            // Handle the case where the session is not available
            return <div>Please log in to view your dashboard.</div>;
        }

        const userId = parseInt(session.user.id);
        const userDetails = await client.user.findFirst({
            where: { id: userId },
            include: {
                school: { select: { name: true } },
                college: { select: { name: true } },
                rooms: { select: { name: true } },
            },
        });
        const requests=await client.friendship.findMany({
            where:{
                receiverId:userId,
                status:"PENDING"
            },
            include:{
                sender:{
                    select:{
                        id:true,
                        name:true,
                        affiliates:true
                    }
                }
            }
        })

        if (!userDetails) {
            return <div className="flex justify-center items-center font-bold text-red-700 pt-24">User details not found.</div>;
        }

        return (
            <div className="w-full p-5 h-full">
                <DashBoard userDetails={userDetails} Requests={requests} userId={userId}/>
            </div>
        );
    } catch (error) {
        console.error("Error fetching user details:", error);
        return <div>An error occurred while loading the dashboard.</div>;
    }
}
