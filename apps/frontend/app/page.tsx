import LandingPage2 from "@/components/Landing";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH);
  return (
    <div className="flex w-full">
      <div className="w-full">
        <LandingPage2 />
      </div>
    </div>
  );
}
