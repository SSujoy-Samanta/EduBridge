import nextAuth from "next-auth"
import { NEXT_AUTH } from "@/lib/auth";

const handler=nextAuth(NEXT_AUTH)
export {handler as GET ,handler as POST}