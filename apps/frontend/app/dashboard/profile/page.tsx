import { UserProfile } from "@/components/UserProfile";
import { NEXT_AUTH } from "@/lib/auth";
import client from "@repo/db/client";
import { getServerSession } from "next-auth";
export default async function Profile() {
  try {
    const session = await getServerSession(NEXT_AUTH);

    if (!session || !session.user) {
      // Handle the case where the session is not available
      return <div>Please log in to view your Profile.</div>;
    }

    const userId = parseInt(session.user.id);
    const userDetail = await client.user.findFirst({
      where: { id: userId },
      include: {
        school: { select: { name: true, degree: true } },
        college: { select: { name: true, degree: true } },
        rooms: { select: { name: true } },
      },
    });
    if (!userDetail) {
      return (
        <div className="flex justify-center items-center font-bold text-red-700 pt-24">
          User details not found.
        </div>
      );
    }
    return (
      <div className=" flex flex-col gap-2 w-full md:p-5 sm:p-2 xxs:p-1 h-full">
        <UserProfile userDetail={userDetail} userId={userId} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    return <div>An error occurred while loading the Profile.</div>;
  }
}
