'use client'
import { ReactNode } from "react"

export const PrimaryButton=({children,onClick}:{children:ReactNode,onClick:()=>void})=>{
    return <div className="px-4 py-2 text-white font-medium  cursor-pointer bg-slate-600 hover:bg-slate-400 text-center text-sm rounded transition " onClick={onClick}>
        {children}
    </div>
}