'use client'
import { useRouter } from "next/navigation"
export const Logo=()=>{
    const router=useRouter();
    return <>
        <div className="p-3 pl-24 cursor-pointer md:pl-20 sm2:pl-12 xxs:pl-4 " onClick={()=>{router.push("/")}} >
            <span className="font-extrabold sm:text-3xl  xxs:text-2xl  text-sky-700">Edu</span>
            <span className="font-extrabold sm:text-3xl  xxs:text-2xl text-cyan-500">Bridge</span>
        </div>
    
    </>
}