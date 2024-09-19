import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session=await getServerSession(NEXT_AUTH);
  return (
    <div className="flex justify-center items-center">
      <div className="pt-24">Home Page Of EduBridge</div>
      <div>
      </div>
    </div>
  );
}
