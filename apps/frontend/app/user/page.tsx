import {  Users } from "@/components/User";
import axios from "axios";
const apiUrl=process.env.NEXT_PUBLIC_API_URL
export default async  function UserDeatilsServer({ searchParams }: { searchParams: { id?: string } }) {
    const id = parseInt(searchParams.id || '');
    let UserData = null;
    if (id) {
        try {
            const response = await axios.get(`${apiUrl}/user/?id=${id}`);
            UserData = response.data;
            
        } catch (error) {
            console.error("Error fetching alumni data:", error);
        }
    }

    return (
        <div>
            {UserData ? (
                <div>
                    <Users usersData={UserData}/>
                </div>
            ) : (
                <p className="flex justify-center items-center font-bold text-red-700 pt-24">Loading User data or no data available...</p>
            )}
        </div>
    );
}
