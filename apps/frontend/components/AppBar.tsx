import { AuthButtons } from "./AuthButtons"
import { Logo } from "./Logo"

export async function AppBar(){
    return <div className="border-b fixed z-20 w-full flex justify-between items-center bg-stone-950 border-cyan-500 h-14">
            <Logo/>
            <div className="p-3">
                <AuthButtons/>
            </div>
    </div>
}