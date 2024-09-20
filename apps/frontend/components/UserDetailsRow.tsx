'use client'

export const UserDetailsRow=({label,details,onClick}:{
    label:string,
    details:string|null,
    onClick:()=>void
})=>{
    return <div className="flex justify-start w-full gap-2 border-4 rounded-md border-cyan-600 p-2 hover:bg-sky-500">
        <div className="font-bold text-black flex justify-center items-center w-2/4 bg-teal-500 p-2 hover:bg-teal-800 rounded-md">{label}</div>
        <div className=" flex justify-center items-center bg-fuchsia-600  w-2/4 p-2 hover:bg-fuchsia-900 rounded-md">
            {details?details:"Add Your Details"}
        </div>
       {/* <div className="flex justify-center items-center bg-gray-600  w-1/4 p-2 hover:bg-slate-800 rounded-md">
        <button onClick={onClick} className="bg-slate-700 border rounded-md border-slate-950 p-1 pl-2 pr-2 hover:bg-slate-900">{details?"Edit":"Add"}</button>
       </div> */}
    </div>
}