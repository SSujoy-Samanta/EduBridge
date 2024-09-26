'use client'
import { ReactNode } from "react"
export const SecondaryButton=({children,onClick,size='small'}:{children:ReactNode,onClick:()=>void,size?:'small'|"big"})=>{
    return <div onClick={onClick} className={`${size==="small"? "text-sm":"text-xl"} ${size==="small"? "px-4 py-2 ": "px-8 py-2"} bg-blue-500 px-4 py-2 text-center text-white rounded-md cursor-pointer hover:shadow-md  border border-blue-700 flex items-center hover:bg-blue-600 font-medium transition sm2:text-xs md:text-sm sm2:px-2 xxs:px-1`}>
        {children}
    </div>

}