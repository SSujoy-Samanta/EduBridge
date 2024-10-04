"use client";
import { useState } from "react";
import { Search } from "./Search";
import { FriendUi } from "./FriendUi";
interface User {
  id: number;
  name: string;
  email: string;
  affiliates: string;
}
export const AllFridendUi = ({
  friends,
  userId,
}: {
  friends: any;
  userId: number;
}) => {
  console.log(friends);
  const [filteredUsers, setFilteredUsers] = useState(friends.data);
  console.log(filterUsers);
  function filterUsers(user: string) {
    const result = friends.data.filter((x: any) =>
      x.name.toLowerCase().includes(user.toLowerCase()),
    );
    setFilteredUsers(result);
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center p-1">
        <div>
          <Search onSearch={filterUsers} />
        </div>
      </div>
      <div className="grid xl:grid-cols-2 p-4 gap-6 lg:grid-cols-2 sm:grid-cols-1  ">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((friend: any, ind: number) => (
            <FriendUi key={ind} friend={friend} userId={userId} />
          ))
        ) : (
          <p className="flex justify-center items-center font-bold text-red-700 pt-24">
            No Friends data available.
          </p>
        )}
      </div>
    </div>
  );
};
