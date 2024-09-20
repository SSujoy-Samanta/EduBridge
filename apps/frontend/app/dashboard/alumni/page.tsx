import { Alumni } from "@/components/Alumni";
import { NEXT_AUTH } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
const apiUrl=process.env.NEXT_PUBLIC_API_URL
export default async function AlumniServer() {
    const session = await getServerSession(NEXT_AUTH);
    let alumniData = null;

    if (session?.user) {
        const id = session.user.id;
        try {
            const response = await axios.get(`${apiUrl}/user/alumni/?id=${id}`);
            alumniData = response.data;
        } catch (error) {
            console.error("Error fetching alumni data:", error);
        }
    }

    return (
        <div>
            {alumniData ? (
                <div className="flex flex-col">
                    <Alumni alumniData={alumniData}/>
                </div>
            ) : (
                <p className="flex justify-center items-center font-bold text-red-700 pt-24">Loading alumni data or no data available...</p>
            )}
        </div>
    );
}
