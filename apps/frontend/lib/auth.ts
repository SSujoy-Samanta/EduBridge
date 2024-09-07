import { signInSchema } from "@repo/common/signUpSchema";
import CredentialsProvider from 'next-auth/providers/credentials';
import client from "@repo/db/client"
import bcrypt from "bcrypt"
import GitHubProvider from "next-auth/providers/github";

interface User {
    id: string;
    email: string;
    name: string;
}

export const NEXT_AUTH={
    providers:[
        CredentialsProvider({
            name:"credintials",
            credentials:{
                email: { label: 'Email', type: 'email', placeholder: 'name@example.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials:any) {
                try{
                    if (!credentials) {
                        return null;
                    }
                    const parsedSignIn=signInSchema.safeParse(credentials);
                    if (!parsedSignIn.success) {
                        console.error("Invalid credentials:", parsedSignIn.error);
                        return null; // Return null for validation errors
                      }
                    const user=await client.user.findUnique({
                        where:{
                            email:parsedSignIn.data.email
                        }
                    })
                    if(!user) {
                        console.error("User not found");
                        return null; // Return null for non-existent users
                    }
                    const isMatch = await bcrypt.compare(parsedSignIn.data.password, user.password);
                    if(!isMatch){
                        return null
                    }
                    return{
                        id: String(user.id),  // Convert id to string
                        email: user.email,
                        name: user.name,
                    } as User;

                }catch(e){
                    console.log("Internal Server error");
                    console.log(e);
                    return null;
                }
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        })

    ],
    pages:{
        signIn:'/signin'
    },
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        jwt:({token,user}:any)=>{
            token.userId = token.sub;
            return token
        },
        session:({session,token,user}:any)=>{
            if(session && session.user){
                session.user.id=token.sub;
            }
            return session
        }
    }
}