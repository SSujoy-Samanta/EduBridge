"use client";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Loader } from "./Loadin2";

interface Address {
  state: string;
  city: string;
}

interface User {
  id: number;
  name: string;
  currDegree: string;
  pastDegree: string;
  address: Address;
  isAccept?: boolean;
}

export const ShowData = ({ user }: { user: User }) => {
  const { id, name, currDegree, pastDegree, address } = user;
  const route = useRouter();
  const [req, setReq] = useState<boolean>(false);
  const { data: session, status } = useSession();
  //@ts-ignore
  const userId = parseInt(session?.user?.id);
  if (!userId) {
    return <Loader />;
  }
  return (
    <div className=" flex gap-2 p-2 items-center border rounded-md border-neutral-800 justify-between hover:bg-gray-900 cursor-pointer xl:text-base md:text-sm xxs:text-xs sm2:flex-col xxs:flex-row xxs:justify-center sm:flex-row w-full">
      <div className="flex gap-2 w-full sm:h-full xxs:h-24 ">
        <div className="flex justify-center items-center w-full h-full xxs:w-2/6  sm:w-1/6">
          <div className="flex justify-center items-center border rounded-md border-neutral-800 bg-slate-800 text-rose-700 w-full h-full text-3xl">
            {name.toUpperCase()[0]}
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full h-full">
          <div className="flex justify-center items-center border-2 rounded-sm border-cyan-950 p-1 font-medium">
            {name.toUpperCase()}
          </div>
          <div className="flex flex-col gap-1 w-full h-full overflow-auto ">
            <div className="flex gap-2 w-full sm2:flex-row xxs:flex-col">
              <div className="flex justify-start item-center gap-1">
                <div className="p-2 border rounded-sm border-gray-800  text-center bg-zinc-900">
                  Present-Degree
                </div>
                <div className="p-2 border rounded-sm border-gray-800 ">
                  {currDegree}
                </div>
              </div>
              <div className="flex justify-start item-center gap-1">
                <div className="p-2 border rounded-sm border-gray-800  text-center bg-zinc-900">
                  Past-Degree
                </div>
                <div className="p-2 border rounded-sm border-gray-800 ">
                  {pastDegree}
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full sm2:flex-row xxs:flex-col">
              <div className="flex justify-start item-center gap-1">
                <div className="p-2 border rounded-sm border-gray-800  text-center bg-zinc-900">
                  State
                </div>
                <div className="p-2 border rounded-sm border-gray-800 ">
                  {address.state}
                </div>
              </div>
              <div className="flex justify-start item-center gap-1">
                <div className="p-2 border rounded-sm border-gray-800  text-center bg-zinc-900">
                  City
                </div>
                <div className="p-2 border rounded-sm border-gray-800 ">
                  {address.city}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-2 gap-2 w-1/6 items-center">
        <PrimaryButton
          onClick={() => {
            route.push(`/user/?id=${id}`);
          }}
        >
          <p className="sm:text-sm xxs:text-xs">view</p>
        </PrimaryButton>
      </div>
    </div>
  );
};
