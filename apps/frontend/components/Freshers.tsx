"use client";
import { useState } from "react";
import { Search } from "./Search";
import { ShowData } from "./ShowData";

interface Address {
  state: string;
  city: string;
}

interface Freshers {
  id: number;
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
  const [filteredUsers, setFilteredUsers] = useState<Freshers[]>(
    freshersData.freshers,
  );

  function filterUsers(user: string) {
    const result = freshersData.freshers.filter((x) =>
      x.name.toLowerCase().includes(user.toLowerCase()),
    );
    setFilteredUsers(result);
  }
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex justify-center items-center p-1">
        <Search onSearch={filterUsers} />
      </div>
      <div className="grid lg:grid-cols-2 p-4 gap-6 xxs:grid-cols-1 w-full">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((fresher, ind) => (
            <ShowData key={ind} user={fresher} />
          ))
        ) : (
          <p className="flex justify-center items-center font-bold text-red-700 pt-24">
            No Freshers data available.
          </p>
        )}
      </div>
    </div>
  );
};
