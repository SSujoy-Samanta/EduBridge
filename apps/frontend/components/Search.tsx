"use client";

import { useState } from "react";

export const Search = ({ onSearch }: { onSearch: (user: string) => void }) => {
  const [input, setInput] = useState<string>("");
  return (
    <div className="flex gap-3 items-center justify-center w-full p-2">
      <div className="w-5/6 ">
        <input
          type="text"
          value={input}
          className="bg-slate-800 border border-cyan-800 rounded-sm p-1 pl-2"
          onChange={(e) => {
            const value = e.target.value;
            setInput(value.trim());
            onSearch(value.trim());
          }}
          placeholder="Search"
        />
      </div>
      <div
        className="w-1/6 border p-1 bg-blue-700 border-zinc-950 rounded-md cursor-pointer"
        onClick={() => {
          onSearch(input);
          setInput("");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="black"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
  );
};
