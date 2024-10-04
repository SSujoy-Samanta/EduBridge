"use client";
import { useRouter } from "next/navigation";
import { Loader } from "./Loadin2";
import { useSession } from "next-auth/react";
import { RequestButton } from "./RequestButton";

interface Address {
  country: string;
  state: string;
  city: string;
}

interface Institution {
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  currDegree: string;
  pastDegree: string;
  affiliates: string;
  school: Institution[]; // Define a type for `schools` and `colleges`
  college: Institution[];
  address: Address;
  isAccept?: boolean;
}

export const UserInfo = ({ user }: { user: User }) => {
  const {
    id,
    name,
    email,
    currDegree,
    pastDegree,
    affiliates,
    address,
    school,
    college,
  } = user;
  const route = useRouter();
  const { data: session } = useSession();
  //@ts-ignore
  const userId = parseInt(session?.user?.id);
  if (!userId) {
    return (
      <div className="p-2 pt-10">
        <Loader />
      </div>
    );
  }
  //console.log(school);

  return (
    <div className="w-full p-2 ">
      <div className="flex p-2 gap-2  md:items-center md:text-base sm2:text-sm xxs:text-xs">
        <div className="w-full p-2 flex flex-col border border-cyan-800 hover:bg-slate-900 rounded-md ">
          <div className="flex p-2 bg-cyan-950 hover:bg-cyan-800 rounded-md ">
            <div className="p-2 w-10 h-10 flex items-center justify-center text-center rounded-full bg-stone-900 text-white">
              {name.toUpperCase()[0]}
            </div>
            <div className="p-2 font-light text-amber-700">
              {name.toUpperCase()}
            </div>
            <div className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="blue"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="p-1 grid md:grid-cols-2 xxs:grid-cols-1 ">
            <div className="p-2 flex flex-col gap-2 ">
              <div className="flex justify-start item-center gap-2">
                <div className="p-2 border rounded-sm border-gray-800 w-1/4 text-center bg-zinc-900 break-all">
                  Name
                </div>
                <div className="p-2 border rounded-sm border-gray-800 w-3/4  break-all">
                  {name}
                </div>
              </div>
              <div className="flex justify-start item-center gap-1">
                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900 break-all">
                  Email
                </div>
                <div className="p-2 border rounded-sm border-gray-800 w-3/4  break-all">
                  {email}
                </div>
              </div>
              <div className="flex justify-start item-center gap-1">
                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900 break-all">
                  Present-Degree
                </div>
                <div className="p-2 border rounded-sm border-gray-800 w-3/4  break-all">
                  {currDegree}
                </div>
              </div>
              <div className="flex justify-start item-center gap-1">
                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900 break-all">
                  Past-Degree
                </div>
                <div className="p-2 border rounded-sm border-gray-800 w-3/4  break-all">
                  {pastDegree}
                </div>
              </div>
            </div>
            <div className="p-2 md:pl-10 flex flex-col gap-2">
              <div className="flex justify-start item-center gap-1">
                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900 break-all">
                  Country
                </div>
                <div className="p-2 border rounded-sm border-gray-800 w-3/4  break-all">
                  {address.country}
                </div>
              </div>
              <div className="flex justify-start item-center gap-1">
                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900 break-all">
                  State
                </div>
                <div className="p-2 border rounded-sm border-gray-800 w-3/4  break-all">
                  {address.state}
                </div>
              </div>
              <div className="flex justify-start item-center gap-1 ">
                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900 break-all">
                  City
                </div>
                <div className="p-2 border rounded-sm border-gray-800 w-3/4  break-all">
                  {address.city}
                </div>
              </div>
              <div className="flex justify-start item-center gap-1 ">
                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900 break-all">
                  Affiliates
                </div>
                <div className="p-2 border rounded-sm border-gray-800 w-3/4 break-all">
                  {affiliates}
                </div>
              </div>
            </div>
          </div>
          <div className="p-1 bg-slate-800"></div>
          <div className="grid md:grid-cols-2 xxs:grid-cols-1 p-2 gap-2">
            <div className="flex justify-start flex-col  item-center gap-1 border-2 border-sky-700 rounded-md">
              <div className="p-2 bg-slate-800 rounded-md text-center">
                Schools
              </div>
              {school.length > 0 ? (
                school.map((x: any, ind: number) => {
                  return <Row key={ind} course={x.degree} ins={x.name} />;
                })
              ) : (
                <Row course="Degree" ins="Institute" />
              )}
            </div>
            <div className="flex justify-start item-center flex-col gap-1 border-2 border-sky-700 rounded-md">
              <div className="p-2 bg-slate-800 rounded-md text-center">
                Colleges
              </div>
              {college.length > 0 ? (
                college.map((x: any, ind: number) => {
                  return <Row key={ind} course={x.degree} ins={x.name} />;
                })
              ) : (
                <Row course="Degree" ins="Institute" />
              )}
            </div>
          </div>
        </div>
        <div className="p-2 fixed bottom-5 left-0  w-full bg-sky-800 bg-opacity-70 flex justify-center items-center  ">
          <RequestButton userId={userId} receiverId={id} />
        </div>
      </div>
    </div>
  );
};
const Row = ({ course, ins }: { course: string; ins: string }) => {
  return (
    <div className="flex justify-start item-center gap-1 p-1 pl-2 pr-2 ">
      <div className="p-2 border rounded-sm border-gray-800 w-1/4 flex justify-center items-center bg-blue-950">
        {course.toUpperCase()}
      </div>
      <div className="p-2 border rounded-sm border-gray-800 w-3/4 break-all">
        {ins}
      </div>
    </div>
  );
};
