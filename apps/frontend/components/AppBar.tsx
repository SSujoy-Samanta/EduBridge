import { AuthButtons } from "./AuthButtons";
import { Logo } from "./Logo";

export async function AppBar() {
  return (
    <div className=" fixed z-20 w-full flex justify-between items-center bg-gradient-to-r from-black via-sky-800 to-blue-900 h-14 border-b border-slate-800">
      <Logo />
      <div className="p-3">
        <AuthButtons />
      </div>
    </div>
  );
}
