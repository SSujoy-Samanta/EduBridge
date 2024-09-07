export const Profile=({userName,onClick}:{
    userName:string,
    onClick:()=>void
})=>{
    const profile=userName[0].toUpperCase();
    return <div onClick={onClick}>
        <div className="bg-cyan-500 rounded-full w-10 h-10 p-2 font-semibold text-center hover:bg-cyan-600 cursor-pointer ">
            {profile}
        </div>
    </div>
}