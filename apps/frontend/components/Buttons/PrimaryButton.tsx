"use client";
import { ReactNode } from "react";

export const PrimaryButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="px-4 py-2 text-white font-medium  cursor-pointer bg-gradient-to-r from-gray-600  to-gray-800 hover:bg-slate-700 sm2:text-center flex items-center gap-1 text-sm rounded transition sm2:text-xs md:text-sm sm2:px-2 xxs:px-1 xxs:text-start"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
