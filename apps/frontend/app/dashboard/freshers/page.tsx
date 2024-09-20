import { Freshers } from "@/components/Freshers";
import { NEXT_AUTH } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
const apiUrl=process.env.NEXT_PUBLIC_API_URL
export default async function AlumniServer() {
    const session = await getServerSession(NEXT_AUTH);
    let freshersData = null;

    if (session?.user) {
        const id = session.user.id;
        try {
            const response = await axios.get(`${apiUrl}/user/freshers/?id=${id}`);
            freshersData = response.data;
        } catch (error) {
            console.error("Error fetching alumni data:", error);
        }
    }

    return (
        <div>
            {freshersData ? (
                <div className="flex flex-col justify-center items-center">
                    <Freshers freshersData={freshersData}/>
                </div>
            ) : (
                <p className="flex justify-center items-center font-bold text-red-700 pt-24">Loading freshers data or no data available...</p>
            )}
        </div>
    );
}
