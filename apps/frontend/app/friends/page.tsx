import { AllFridendUi } from "@/components/Friends";
import { NEXT_AUTH } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
interface User {
  id: number;
  name: string;
  email: string;
  affiliates: string;
}
export default async function Friends() {
  const session = await getServerSession(NEXT_AUTH);
  if (!session) {
    return <div>Please log in to view your friends list.</div>;
  }
  let friends: User[] = [];
  const userId = parseInt(session.user.id);
  try {
    const res = await axios.get(`${apiUrl}/friends`, {
      params: {
        id: userId,
      },
    });
    friends = res.data;
  } catch (error) {
    console.error("Error fetching friends:", error);
  }
  return (
    <div>
      {friends ? (
        <div className="flex flex-col">
          <AllFridendUi friends={friends} userId={userId} />
        </div>
      ) : (
        <p className="flex justify-center items-center font-bold text-red-700 pt-24">
          Loading friends data or no data available...
        </p>
      )}
    </div>
  );
  // return <div className="grid grid-cols-2 p-4 gap-6">
  //     {friends.data.length > 0 ? (
  //         friends.data.map((friend:User, ind:number) => (
  //         <FriendUi key={ind} friend={friend} userId={userId}/>
  //         ))
  //     ) : (
  //         <p className="flex justify-center text-center items-center font-bold text-red-700 pt-24">No Friends data available.</p>
  //     )}
  // </div>
}
