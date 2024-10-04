"use client";
import { useState } from "react";
import { InputBox } from "./InputBox";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";
import GoogleSVG from "./CustomSvg/Google";

export const SignIn = () => {
  const setNotification = useSetRecoilState(notificationState);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = async () => {
    if (!email || !password) {
      setNotification({
        msg: "Email and password cannot be empty",
        type: "error",
      });
      return;
    }
    const trimmedEmail = email.trim();
    // Sign in using the credentials provider
    try {
      // Sign in using the credentials provider
      const res = await signIn("credentials", {
        redirect: false,
        email: trimmedEmail,
        password,
        callbackUrl: "", // Adjust the post-login redirect URL
      });

      if (res?.error) {
        setNotification({ msg: "Invalid credentials", type: "error" });
      } else if (res?.ok) {
        router.push("/dashboard");
        setNotification({ msg: "Sign-in successful", type: "success" });
      }
    } catch (error) {
      setNotification({
        msg: "An error occurred during sign-in",
        type: "error",
      });
    }
  };

  return (
    <div className="flex justify-center flex-col gap-2 items-center xl:w-2/6 border rounded-md p-2 bg-cyan-900 border-sky-400 mb-10 md:w-3/6 sm:w-3/5 md:text-base sm:text-sm xxs:text-xs sm2:w-4/6 xxs:w-5/6">
      <InputBox
        label={"Email"}
        placeholder={"name@gmail.com"}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <InputBox
        label={"Password"}
        placeholder={"Enter your password"}
        type={"password"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div className="p-2">
        <PrimaryButton onClick={handleSignIn}>LogIn</PrimaryButton>
      </div>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-5/6 h-px my-5 bg-gray-800 border-0 dark:bg-gray-800" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900 rounded-md">
          OR
        </span>
      </div>
      <div
        className="xxs:w-full sm:w-5/6 md:w-4/5 flex justify-around items-center p-2  bg-white rounded-md cursor-pointer hover:bg-gray-300"
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
      {/* <div className="font-bold border rounded-md w-full p-3 text-center hover:bg-slate-800 cursor-pointer" onClick={()=>{
            signIn('github',{
                redirect: true, // Set to true if you want to redirect to the callback URL automatically
                callbackUrl: "/dashboard" // Change this to the desired post-login page
            })
        }}>CONTINUE WITH GIT HUB</div>
        <div className="font-bold border rounded-md w-full p-3 text-center bg-blue-600 hover:bg-blue-500 cursor-pointer" onClick={()=>{
            
        }} >CONTINUE WITH FACEBOOK</div> */}
      <div className="flex justify-start p-2 gap-1 items-center cursor-pointer">
        <div className="w-7 h-7 flex justify-start items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>
        <div
          className="text-stone-800 underline font-semibold"
          onClick={() => {
            router.push("/signup");
          }}
        >
          Create an Account
        </div>
      </div>
    </div>
  );
};
