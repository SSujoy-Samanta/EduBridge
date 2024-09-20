'use client'

import { useState } from "react"
import { SecondaryButton } from "./Buttons/SecondaryButton"

export const UpdateProfile=()=>{
    const [data,setData]=useState("");

    return <div className="w-full flex justify-center items-center p-2 gap-2">
        <div className="text-black">
          <select 
            name="select-opt"
            value={data || ""}
            onChange={(e)=>{setData(e.target.value)}}
            className="text-white rounded-md bg-neutral-800 border border-cyan-900 p-1"
          >
            <option value="">SELECT</option>
            <option value="school" key={1}>SCHOOL</option>
            <option value="college" key={2}>COLLEGE</option>
          </select> 
        </div>
        <div>
            <input type="text" className="p-1 bg-slate-800 border border-sky-800 rounded-sm" placeholder="Enter the details"/>
        </div>
        <div>
            <SecondaryButton onClick={()=>{}}>Add</SecondaryButton>
        </div>
    </div>
}