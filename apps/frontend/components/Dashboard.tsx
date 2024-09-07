'use client'
import { useRouter } from "next/navigation";
import { LinkButton } from "./Buttons/LinkButton";
import { SecondaryButton } from "./Buttons/SecondaryButton";
import { UserDetailsRow } from "./UserDetailsRow";
import { useState } from 'react';
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const DashBoard = ({
    userDetails,
    Requests,
    userId
}: {
    userDetails: any,
    Requests: any,
    userId: number
}) => {
    const setNotification = useSetRecoilState(notificationState);
    const router = useRouter();
    
    // Maintain accept state per request
    const [acceptedRequests, setAcceptedRequests] = useState<number[]>([]);

    const handleAcceptRequest = async (senderId: number) => {
        try {
            await axios.post(`${apiUrl}/friends/friend-request/accept`, {
                senderId: senderId,
                receiverId: userId
            });

            // Update accepted state for this request
            setAcceptedRequests((prev) => [...prev, senderId]);
            setNotification({ msg: "Friend Request Accepted", type: "success" });
        } catch (error: any) {
            setNotification({ msg: error.response?.data.msg || "Error accepting request", type: "error" });
        }
    };

    return (
        <div className="flex w-full h-full gap-4">
            <div className="w-4/6 h-full rounded-md p-2 flex flex-col gap-2">
                <UserDetailsRow label={"Username"} details={userDetails.name} onClick={() => { }} />
                <UserDetailsRow label={"Email"} details={userDetails.email} onClick={() => { }} />
                <UserDetailsRow label={"Phone No"} details={userDetails.mobile} onClick={() => { }} />
                <UserDetailsRow label={"Affiliates"} details={userDetails.affiliates} onClick={() => { }} />
                <UserDetailsRow label={"Age"} details={userDetails.age} onClick={() => { }} />
                <UserDetailsRow label={"Present-Degree"} details={userDetails.currDegree} onClick={() => { }} />
                <UserDetailsRow label={"Past-Degree"} details={userDetails.pastDegree} onClick={() => { }} />
                <UserDetailsRow label={"School"} details={null} onClick={() => { }} />
                <UserDetailsRow label={"College"} details={null} onClick={() => { }} />
            </div>

            <div className="flex flex-col w-2/6 max-h-full rounded-md p-2">
                <div className="flex justify-around p-3">
                    <div><LinkButton onClick={() => { router.push("dashboard/freshers") }}>Freshers</LinkButton></div>
                    <div><SecondaryButton onClick={() => { router.push("dashboard/alumni") }}>Alumni</SecondaryButton></div>
                </div>

                <div className="bg-teal-950 flex flex-col gap-2 rounded-md p-2 h-4/5">
                    {
                        Requests.length > 0 ? Requests.map((x: any, ind: number) => (
                            <div key={ind} className="border rounded bg-slate-900 p-2 flex gap-1 justify-between items-center border-slate-800 hover:bg-gray-800">
                                <div className="flex gap-1 items-center">
                                    <div className="border bg-slate-800 p-1 rounded-md w-8 h-8 text-center border-teal-900">
                                        {x.sender.name ? x.sender.name.toUpperCase()[0] : "U"}
                                    </div>
                                    <div className="flex flex-col pl-3">
                                        <div className="text-rose-800 font-semibold">
                                            {x.sender.name.toUpperCase()}
                                        </div>
                                        <div className="text-cyan-700 font-light">
                                            {x.sender.affiliates === "freshers" ? `Joined as a ${x.sender.affiliates}` : `Joined as an ${x.sender.affiliates}`}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="border border-gray-700 p-1 px-2 rounded-md" onClick={() => {
                                        router.push(`/user/?id=${x.sender.id}`);
                                    }}>View</button>

                                    {/* Check if request is already accepted */}
                                    <AcceptReq
                                        disable={acceptedRequests.includes(x.sender.id)}
                                        onClick={() => handleAcceptRequest(x.sender.id)}
                                    />
                                </div>
                            </div>
                        )) : (
                            <div className="border rounded bg-slate-900 p-1 text-center border-slate-800 text-teal-600">NO REQUESTS</div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

// AcceptReq Component for the "Accept" button
const AcceptReq = ({ disable, onClick }: { disable: boolean, onClick: () => void }) => {
    return (
        <button
            disabled={disable}
            className={disable ? `border border-blue-700 px-2 bg-blue-900 p-1 rounded-md cursor-not-allowed` : `border border-blue-700 px-2 bg-blue-800 p-1 rounded-md`}
            onClick={onClick}
        >
            {disable ? "Accepted" : "Accept"}
        </button>
    );
};
