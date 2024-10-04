import { From } from "@/components/ProviderForm/From";
import { NEXT_AUTH } from "@/lib/auth";
import client from "@repo/db/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function UserDetails(id: number): Promise<boolean> {
  try {
    const userDetail = await client.user.findFirst({
      where: { id: id },
      select: {
        affiliates: true,
        currDegree: true,
        pastDegree: true,
        address: {
          select: {
            country: true,
            state: true,
            city: true,
          },
        },
      },
    });
    //console.log(userDetail)
    if (!userDetail) {
      return false;
    }
    if (
      userDetail.affiliates &&
      userDetail.currDegree &&
      userDetail.pastDegree &&
      userDetail.address
    ) {
      return true;
    }
    return false;
  } catch (error: any) {
    console.error("Error fetching user details:", error);
    return false;
  }
}
export default async function AddUserInfo() {
  const session = await getServerSession(NEXT_AUTH);
  if (!session || !session.user) {
    // Redirect to login page if no session
    return <div>Please log in to view your Profile.</div>;
  }
  const userId = parseInt(session.user.id);

  const userDetail = await UserDetails(userId);

  if (!userDetail) {
    return (
      <div className="fixed dark:bg-slate-900 z-30 -top-14 left-0 right-0 bottom-0 dark:bg-opacity-10 min-h-full w-full  flex justify-center items-center text-red-700">
        <From userId={userId} />
      </div>
    );
  } else {
    redirect("/dashboard");
  }
}
