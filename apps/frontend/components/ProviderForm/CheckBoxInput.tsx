"use client";
import React from "react";

export const CheckBoxInput = ({
  affiliate,
  setAffiliate,
}: {
  affiliate: string;
  setAffiliate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAffiliate(event.target.value);
  };

  return (
    <div className="flex flex-col items-start justify-center pt-2">
      <p className="text-lg font-bold mb-1 text-sky-600">Joining as a</p>
      <form className="w-full max-w-sm pl-2 text-lg">
        <div className="flex items-center mb-1">
          <input
            type="checkbox"
            id="Freshers"
            name="affiliate"
            value="Freshers"
            checked={affiliate === "Freshers"}
            onChange={handleSelection}
            className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
          />
          <label htmlFor="Freshers" className="text-pink-700">
            Freshers
          </label>
        </div>

        <div className="flex items-center mb-1">
          <input
            type="checkbox"
            id="Alumni"
            name="affiliate"
            value="Alumni"
            checked={affiliate === "Alumni"}
            onChange={handleSelection}
            className="mr-2 cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="Alumni" className="text-pink-700">
            Alumni
          </label>
        </div>
      </form>
    </div>
  );
};
