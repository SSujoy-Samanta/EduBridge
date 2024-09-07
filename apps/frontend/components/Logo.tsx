'use client'
import { useRouter } from "next/navigation"
export const Logo=()=>{
    const router=useRouter();
    return <>
        <div className="p-3 pl-24 cursor-pointer" onClick={()=>{router.push("/")}} >
            <span className="font-extrabold text-3xl text-sky-700">Edu</span>
            <span className="font-extrabold text-3xl text-cyan-500">Bridge</span>
        </div>
    
    </>
}