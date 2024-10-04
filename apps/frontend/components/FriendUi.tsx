"use client";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";

interface User {
  id: number;
  name: string;
  email: string;
  affiliates: string;
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const FriendUi = ({
  friend,
  userId,
}: {
  friend: User;
  userId: number;
}) => {
  const router = useRouter();
  const [unfriend, setUnfriend] = useState<boolean>(false);
  const { id, name, email, affiliates } = friend;
  const setNotification = useSetRecoilState(notificationState);
  const handleUnfriend = async () => {
    try {
      await axios.post(`${apiUrl}/friends/friend-request/decline`, {
        senderId: userId,
        receiverId: id,
      });
      setUnfriend((x) => !x);
      setNotification({ msg: "Unfriend Successful", type: "success" });
    } catch (error: any) {
      setNotification({
        msg: error.response?.data.msg || "Error while unfriending",
        type: "error",
      });
    }
  };
  return (
    <div className=" flex gap-2 p-2 items-center border rounded-md border-neutral-800 justify-between hover:bg-gray-900 cursor-pointer md:text-sm  sm2:text-xs sm:flex-row sm2:flex-col sm2:justify-start sm2:items-start sm2:p-1 xxs:flex-col xxs:items-start xxs:p-1 xxs:text-xs sm:text-sm lg:text-base">
      <div className="flex gap-2 p-2 w-5/6 h-full ">
        <div className="flex justify-center items-center border rounded-md border-neutral-800 bg-slate-800 text-sky-600 p-2  h-full w-1/6 text-3xl sm:w-1/6  xxs:w-2/6">
          {name.toUpperCase()[0]}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-center items-center border-2 rounded-sm border-cyan-950 p-1 font-medium bg-blue-900">
            {name.toUpperCase()}
          </div>
          <div className="flex gap-2 w-full xxs:flex-col sm2:flex-row">
            <div className="flex justify-start item-center gap-1">
              <div className="p-2 border rounded-sm border-gray-800  text-center bg-cyan-700">
                Email
              </div>
              <div className="p-2 border rounded-sm border-gray-800 ">
                {email}
              </div>
            </div>
            <div className="flex justify-start item-center gap-1">
              <div className="p-2 border rounded-sm border-gray-800  text-center bg-green-800">
                Affiliates
              </div>
              <div className="p-2 border rounded-sm border-gray-800 ">
                {affiliates}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-2 gap-2 w-1/6 xxs:flex-row sm:flex-col sm:w-1/6  xxs:w-full ">
        <div className="w-full text-center">
          <PrimaryButton
            onClick={() => {
              router.push(`/user/?id=${id}`);
            }}
          >
            <p className=" w-full flex justify-center items-center">Show</p>
          </PrimaryButton>
        </div>
        <div className="w-full">
          <button
            disabled={unfriend}
            className={
              unfriend
                ? `cursor-not-allowed w-full h-full rounded-md bg-red-700 text-sm hover:bg-red-800 transition p-2 text-center`
                : `w-full h-full rounded-md bg-amber-700 text-sm hover:bg-amber-800 transition p-2 text-center`
            }
            onClick={handleUnfriend}
          >
            unfriend
          </button>
        </div>
      </div>
    </div>
  );
};
