'use client'

import { useEffect, useRef, useState } from "react"
import { Message } from "./Message";
import { useSession } from "next-auth/react";
const wsUrl=process.env.WS_URL
function useSocket(id: string | null) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        if (id) {
            const newSocket = new WebSocket(`${wsUrl}`);
            newSocket.onopen = () => {
                setSocket(newSocket);
                console.log("Socket connected");
            };
            return () => {
                newSocket.close();
            };
        }
    }, [id]);

    return socket;
}
function useUserDetails() {
    const { data: session } = useSession();
    const [username, setUsername] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    useEffect(() => {
        if (session) {
            setUsername(session.user?.name || null);
            //@ts-ignore
            setId(session.user?.id || null);
        }
    }, [session]);

    return { username, id };
}
export const Chating=()=>{
    const {username,id}=useUserDetails();
    const socket=useSocket(id);
    const [input,setInput]=useState("");
    const [messages, setMessages] = useState<{ text: string; sender: string }[]>([])
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (socket && id) {
            socket.onmessage = (msg) => {
                // Assuming messageData is a string; adjust parsing as needed
                const messageData = JSON.parse(msg.data);

                // Append the received message to the state
                setMessages((prevMessages) => [...prevMessages, messageData]);
            };
        }
    }, [socket]);
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log("Enter key pressed!");
            if(socket && input.trim()){
                socket.send(JSON.stringify({ text: input, sender: username }));
                setInput("");
            }
            event.preventDefault(); 
        }
    };
    return <div className="text-white  bg-cyan-500 w-3/6 flex justify-center flex-col p-3 border rounded-md border-teal-700 gap-1">
        <div className="flex justify-between items-center">
            <div className="flex justify-start items-center ">
                <div className="rounded-full p-2 border w-10 h-10 text-center text-white bg-black border-cyan-950">{username?username[0]:"U"}</div>
                <p className="pl-2">{username?username:"Unkonwn"}</p>
            </div>
            <div className="pr-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                    <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
                </svg>

            </div>
        </div>
        <div className="border border-cyan-900 p-2 rounded-md overflow-auto  h-96 bg-zinc-900 " ref={containerRef}>
            {
                messages.map((msg,ind)=>{

                    return <Message key={ind} type={msg.sender===username?"You":msg.sender} msg={msg.text} user={msg.sender}/>
                })
            }
        </div>
        <div className="flex justify-between p-2 gap-2">
            <input value={input}  onKeyDown={handleKeyDown} onChange={(e)=>{setInput(e.target.value)}} className="text-black w-full rounded-md p-2"/>
            <button onClick={()=>{
                if(socket && input.trim()){
                    socket.send(JSON.stringify({ text: input.trim(), sender: username }));
                    setInput("");

                }
            }} className="border rounded-md border-slate-800 p-2 bg-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="balck" className="size-6">
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
            </button>
        </div>
    </div>
}