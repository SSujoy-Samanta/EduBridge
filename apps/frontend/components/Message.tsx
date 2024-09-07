export const Message=({msg,type='You',user}:{
    msg:string,
    type:string,
    user:string|null
})=>{
    return <div className="w-full">
        <div className={type==='You'?`flex justify-end`:`flex justify-start`}>
            <div className="flex justify-start flex-col w-2/6">
                <label className="font-light text-amber-700 ">{user}</label>
                <p className={type==='you'?`"m-1 border rounded-md p-2 border-teal-500 bg-sky-800 break-all"`:"m-1 border rounded-md p-2 border-sky-500 bg-teal-800 break-all"}>{msg}</p>
            </div>
        </div> 
    </div> 
}