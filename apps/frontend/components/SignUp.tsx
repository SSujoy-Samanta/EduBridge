"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { EmailSvg } from "./CustomSvg/Email";
import GoogleSVG from "./CustomSvg/Google";
export const SignUp = () => {
  const router = useRouter();
  return (
    <div className=" flex h-full xl:w-3/12 lg:w-4/12 md:w-6/12 flex-col justify-center items-center gap-2  p-3 rounded-md border border-cyan-900  sm2:text-base xxs:text-xs cursor-pointer">
      <div
        className="w-full flex justify-around items-center p-2 bg-gray-800 hover:bg-gray-900 rounded-md"
        onClick={() => {
          router.push("/signup/viaemail");
        }}
      >
        <div className="p-1">
          <EmailSvg />
        </div>
        <p className="text-white font-semibold">CONTINUE WITH EMAIL</p>
      </div>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900 rounded-md">
          OR
        </span>
      </div>
      <div
        className="w-full flex justify-around items-center p-2  bg-white hover:bg-gray-300 rounded-md cursor-pointer"
        onClick={() => {
          signIn("google", {
            redirect: true, // Set to true if you want to redirect to the callback URL automatically
            callbackUrl: "/adduserinfo", // Change this to the desired post-login page
          });
        }}
      >
        <div>
          <GoogleSVG />
        </div>
        <p className="text-gray-700 font-semibold">CONTINUE WITH GOOGLE</p>
      </div>
    </div>
  );
};
