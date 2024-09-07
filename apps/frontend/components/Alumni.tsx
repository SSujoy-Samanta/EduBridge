
import { ShowData } from "./ShowData";
interface Address {
    state: string;
    city: string;
}

interface Alumni {
    id:number,
    name: string;
    currDegree: string;
    pastDegree: string;
    address: Address;
    isAccept?: boolean;
}

interface AlumniData {
    alumni: Alumni[];
}
interface AlumniProps {
    alumniData: AlumniData;
}
export const Alumni=({ alumniData }: AlumniProps)=>{
    return <div className="grid grid-cols-2 p-4 gap-6">
            {alumniData.alumni.length > 0 ? (
                alumniData.alumni.map((alumnus, ind) => (
                   <ShowData key={ind} user={alumnus}/>
                ))
            ) : (
                <p className="flex justify-center items-center font-bold text-red-700 pt-24">No alumni data available.</p>
            )}
    </div>
}