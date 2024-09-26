'use client'
import { ReactNode } from "react"

export const LinkButton=({children,onClick,size='small'}:{children:ReactNode,onClick:()=>void,size?:'small'|"big"})=>{
    return <div onClick={onClick} className={`${size==="small"? "text-sm":"text-xl"} ${size==="small"? "px-4 py-2": "px-8 py-2"} bg-red-500 px-4 py-2 text-center text-white rounded-md cursor-pointer hover:shadow-md font-medium hover:bg-red-700 transition sm2:text-xs md:text-sm sm2:px-2 xxs:px-1`}>
        {children}
    </div>
}