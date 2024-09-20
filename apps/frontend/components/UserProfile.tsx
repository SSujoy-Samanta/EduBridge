'use client'
import { UserDetailsRow } from "./UserDetailsRow";
export const  UserProfile=async({userDetails}:{
    userDetails:any
})=>{
    return <div className="flex w-full h-full gap-4">
        <div className="w-2/6 h-full rounded-md p-2 flex flex-col gap-2 overflow-auto">
            <UserDetailsRow label={"Username"} details={userDetails.name} onClick={() => { }} />
            <UserDetailsRow label={"Email"} details={userDetails.email} onClick={() => { }} />
            <UserDetailsRow label={"Phone No"} details={userDetails.mobile} onClick={() => { }} />
            <UserDetailsRow label={"Affiliates"} details={userDetails.affiliates} onClick={() => { }} />
            <UserDetailsRow label={"Age"} details={userDetails.age} onClick={() => { }} />
            <UserDetailsRow label={"Present-Degree"} details={userDetails.currDegree} onClick={() => { }} />
            <UserDetailsRow label={"Past-Degree"} details={userDetails.pastDegree} onClick={() => { }} />
        </div>
        <div className="w-3/6 h-full rounded-md p-2 flex flex-col gap-2 overflow-auto">
            <UserDetailsRow label={"School"} details={null} onClick={() => { }} />
            <UserDetailsRow label={"College"} details={null} onClick={() => { }} />
        </div>
    </div>
}