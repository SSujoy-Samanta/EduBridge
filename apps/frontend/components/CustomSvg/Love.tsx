'use client';

import axios from 'axios';
import { useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const LoveButton = ({ liked, postId }: { liked: number; postId: number }) => {
  const [loved, setLoved] = useState(false);
  const [count, setCount] = useState<number>(liked);

  const handleLoveClick = async () => {
    const newLovedStatus = !loved;
    setLoved(newLovedStatus);

    try {
      if (newLovedStatus) {
        // Increment like count
        await axios.put(`${apiUrl}/posts`, {
          postId,
          type: 'increment',
        });
        setCount((prevCount) => prevCount + 1);
      } else {
        // Decrement like count
        await axios.put(`${apiUrl}/posts`, {
          postId,
          type: 'decrement',
        });
        setCount((prevCount) => prevCount - 1);
      }
    } catch (e: any) {
      console.error("Error updating like count: ", e);
      // Optionally handle the error here
    }
  };

  return (
    <div className="flex justify-start items-center gap-2">
      <button
        onClick={handleLoveClick}
        className="focus:outline-none"
        aria-label="Love"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={loved ? "red" : "none"}
          stroke="currentColor"
          strokeWidth={2}
          className={`w-6 h-6 transition-transform duration-500 ${
            loved ? "scale-125 animate-pulse" : "scale-100"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.172 4.172a4.004 4.004 0 015.656 0L12 7.343l3.172-3.171a4.004 4.004 0 015.656 5.656L12 18.343 3.172 9.828a4.004 4.004 0 010-5.656z"
          />
        </svg>
      </button>
      <p className="text-slate-500">{count}</p>
    </div>
  );
};

export default LoveButton;