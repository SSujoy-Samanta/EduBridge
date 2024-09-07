'use client'
import { useState } from "react"
import { InputBox } from "./InputBox"
import { PrimaryButton } from "./Buttons/PrimaryButton";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";

export const SignIn=()=>{
    const setNotification = useSetRecoilState(notificationState);
    const router=useRouter();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleSignIn = async () => {
        // Sign in using the credentials provider
        const res = await signIn('credentials', {
            redirect: false, // Set to true if you want to redirect to the callback URL automatically
            email,
            password,
            callbackUrl: "" // Change this to the desired post-login page
        });
        if (res?.error) {
            setNotification({ msg: "Invalid credentials", type: "error" });
        } else if (res?.ok) {
            await router.push("/dashboard");
            setNotification({ msg: "Sign-in successful", type: "success" });
        }
    };


    return <div className="flex justify-center flex-col gap-2 items-center w-2/6 border rounded-md p-2 bg-cyan-900 border-sky-400">
        <InputBox label={"Email"} placeholder={"name@gmail.com"} onChange={(e)=>{setEmail(e.target.value)}}/>
        <InputBox label={"Password"} placeholder={"Enter your password"} type={"password"} onChange={(e)=>{setPassword(e.target.value)}}/>
        <PrimaryButton onClick={handleSignIn}>LogIn</PrimaryButton>
        <div className="border w-full"></div>
        <div className="font-bold border rounded-md w-full p-3 text-center bg-amber-600 hover:bg-amber-500 cursor-pointer" onClick={()=>{
            alert("google")
        }}>CONTINUE WITH GOOGLE</div>
        <div className="font-bold border rounded-md w-full p-3 text-center hover:bg-slate-800 cursor-pointer" onClick={()=>{
            signIn('github',{
                redirect: true, // Set to true if you want to redirect to the callback URL automatically
                callbackUrl: "/dashboard" // Change this to the desired post-login page
            })
        }}>CONTINUE WITH GIT HUB</div>
        <div className="font-bold border rounded-md w-full p-3 text-center bg-blue-600 hover:bg-blue-500 cursor-pointer" onClick={()=>{
            
        }} >CONTINUE WITH FACEBOOK</div>
        <div className="flex justify-start p-2 gap-2 items-center cursor-pointer">
            <div className="w-7 h-7 text-red-700 rounded-full border border-amber-700 font-light text-center">i</div>
            <div className="text-stone-800 underline font-semibold" onClick={()=>{router.push('/signup')}}>Create an Account</div>
        </div>
    </div>
}