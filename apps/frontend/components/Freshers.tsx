import { ShowData } from "./ShowData";

interface Address {
    state: string;
    city: string;
}

interface Freshers {
    id:number,
    name: string;
    currDegree: string;
    pastDegree: string;
    address: Address;
    isAccept?: boolean;
}

interface FreshersData {
    freshers: Freshers[];
}

interface FreshersProps {
    freshersData: FreshersData;
}

export const Freshers = ({ freshersData }: FreshersProps) => {
    //console.log(freshersData)
    return (
        <div className="grid grid-cols-2 p-4 gap-6">
            {freshersData.freshers.length > 0 ? (
                freshersData.freshers.map((fresher, ind) => (
                    <ShowData key={ind} user={fresher}/>
                ))
            ) : (
                <p className="flex justify-center items-center font-bold text-red-700 pt-24">
                    No alumni data available.
                </p>
            )}
        </div>
    );
};
