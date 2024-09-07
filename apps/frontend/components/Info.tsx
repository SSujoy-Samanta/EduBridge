'use client'
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
    id:number,
    name: string;
    email: string;
    currDegree: string;
    pastDegree: string;
    affiliates: string;
    schools: Institution[]; // Define a type for `schools` and `colleges`
    colleges: Institution[];
    address: Address;
    isAccept?: boolean;
}

export const UserInfo = ({ user }: { user: User }) => {
    const {id, name, email, currDegree, pastDegree, affiliates,address } = user;
    const route=useRouter();
    const { data: session} =useSession();
    //@ts-ignore
    const userId = parseInt(session?.user?.id);
    if(!userId){
        return <Loader/>
    }
   
    return (
        <div className="w-full p-2 ">
            <div className="flex p-2 gap-2  items-center">
                <div className="w-5/6 p-2 flex flex-col border border-cyan-800 hover:bg-slate-900 rounded-md  ">
                    <div className="flex p-2 bg-cyan-950 hover:bg-cyan-800 rounded-md ">
                        <div className="p-2 w-10 h-10 text-center rounded-full bg-stone-900 text-white">
                            {name.toUpperCase()[0]}
                        </div>
                        <div className="p-2 font-light text-amber-700">{name.toUpperCase()}</div>
                        <div className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" className="size-6">
                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className=" p-1 grid grid-cols-2">
                        
                        <div className="p-2 flex flex-col gap-2 ">
                            <div className="flex justify-start item-center gap-2">
                                <div className="p-2 border rounded-sm border-gray-800 w-1/4 text-center bg-zinc-900">Name</div>
                                <div className="p-2 border rounded-sm border-gray-800 w-3/4">{name}</div>
                            </div>
                            <div className="flex justify-start item-center gap-1">
                                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900">Email</div>
                                <div className="p-2 border rounded-sm border-gray-800 w-3/4">{email}</div>
                            </div>
                            <div className="flex justify-start item-center gap-1">
                                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900">Present-Degree</div>
                                <div className="p-2 border rounded-sm border-gray-800 w-3/4">{currDegree}</div>
                            </div>
                            <div className="flex justify-start item-center gap-1">
                                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900">Past-Degree</div>
                                <div className="p-2 border rounded-sm border-gray-800 w-3/4">{pastDegree}</div>
                            </div>
                        </div>
                        <div className="p-2 pl-10 flex flex-col gap-2">
                            <div className="flex justify-start item-center gap-1">
                                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900">Country</div>
                                <div className="p-2 border rounded-sm border-gray-800 w-3/4">{address.country}</div>
                            </div>
                            <div className="flex justify-start item-center gap-1">
                                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900">State</div>
                                <div className="p-2 border rounded-sm border-gray-800 w-3/4">{address.state}</div>
                            </div>
                            <div className="flex justify-start item-center gap-1 ">
                                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900">City</div>
                                <div className="p-2 border rounded-sm border-gray-800 w-3/4">{address.city}</div>
                            </div>
                            <div className="flex justify-start item-center gap-1 ">
                                <div className="p-2 border rounded-sm border-gray-800  w-1/4 text-center bg-zinc-900">Affiliates</div>
                                <div className="p-2 border rounded-sm border-gray-800 w-3/4">{affiliates}</div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="p-1 bg-slate-800"></div>
                    <div className="grid grid-cols-2 p-2 gap-2">
                        <div className="flex justify-start flex-col  item-center gap-1 border-2 border-sky-700 rounded-md">
                            <div className="p-2 bg-slate-800 rounded-md text-center">Schools</div>
                           <Row course="HS" ins="SSPHS"/>
                           <Row course="HS" ins="SSPHS"/>
                           <Row course="HS" ins="SSPHS"/>
                        </div>
                        <div className="flex justify-start item-center flex-col gap-1 border-2 border-sky-700 rounded-md">
                            <div className="p-2 bg-slate-800 rounded-md text-center">Colleges</div>
                            <Row course="BTech" ins="TECHNO"/>
                            <Row course="BTech" ins="TECHNO"/>
                            <Row course="BTech" ins="TECHNO"/>
                        </div>

                    </div>
                </div>
               <div className="p-2 w-1/6 h-full flex justify-center items-center border-2 rounded-md border-teal-800 hover:bg-slate-900">
                <RequestButton userId={userId} receiverId={id}/>
               </div>
            </div>
        </div>
    );
}
const Row=({course,ins}:{
    course:string,
    ins:string
})=>{
    return <div className="flex justify-start item-center gap-1 p-1 pl-2 pr-2 ">
        <div className="p-2 border rounded-sm border-gray-800  w-1/4 flex justify-center items-center bg-blue-950">{course}</div>
        <div className="p-2 border rounded-sm border-gray-800 w-3/4 break-all">{ins}</div>
</div>
}
