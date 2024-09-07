import { UserInfo } from "./Info";

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
  schools: Institution[]; // Assuming it's an array of institutions
  colleges: Institution[]; // Assuming it's an array of institutions
  address: Address;
  isAccept?: boolean;
}
interface UsersData {
  user: User; 
}
interface UserProps {
  usersData: UsersData; 
}

export const Users = ({ usersData }: UserProps) => {
  // Ensure usersData and users are defined before proceeding
  const user = usersData.user;
  return (
    <div>
         {user ?  <UserInfo  user={user}/>
          : 
          (
            <p className="flex justify-center items-center font-bold text-red-700 pt-24">No User data available.</p>
        )} 
        

    </div>
  );
};
