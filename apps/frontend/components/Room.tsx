'use client'
import { useEffect, useState } from 'react';
import { InputBox } from './InputBox';
import { PrimaryButton } from './Buttons/PrimaryButton';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '@/lib/atom';
import axios from 'axios';
import { LinkButton } from './Buttons/LinkButton';
import { RoomDetails } from './RoomDetails';
//import { useRouter } from 'next/navigation';
const apiUrl=process.env.NEXT_PUBLIC_API_URL
interface UserRoom{
    id: number;
    name: string;
    passkey: string | null;
    createdBy: number;
}
export const Room=({ userId, initialUserRooms }: { userId: number, initialUserRooms: UserRoom[] })=>{
    const setNotification=useSetRecoilState(notificationState);
    const [group,setGroup]=useState<boolean>(false);
    const [inpGroup,setInpGroup]=useState("");
    const [Join,setJoin]=useState<boolean>(false);
    const [inpJoin,setInpJoin]=useState("");
    //const router=useRouter();
    const [userRooms, setUserRooms] = useState<UserRoom[]>(initialUserRooms); // Use state for userRooms
    const [groupCreated, setGroupCreated] = useState(false);
    const fetchUserRooms = async () => {
        try {
            const response = await axios.get(`${apiUrl}/room/getrooms`, { params: { id:userId} });
            setUserRooms(response.data.userRooms); // Update userRooms state
        } catch (error) {
            setNotification({ msg: "Error fetching rooms", type: "error" });
        }
    };
    const openLinkInNewTab = (url: string) => {
        window.open(url, '_blank');
    };
    // Fetch userRooms on mount or after group creation
    useEffect(() => {
        fetchUserRooms();
    }, [groupCreated]);
    return <div className="flex gap-2 p-3 w-full h-full justify-between">
        <div className='w-3/6 flex flex-col gap-2 items-center border rounded m-4 p-2 min-h-3.5 border-teal-800 overflow-auto'>
            {
                userRooms && userRooms.map((room:UserRoom)=>{
                    return <RoomDetails key={room.id} name={room.name} passkey={room.passkey} roomId={room.id} userId={userId} setGroupCreated={setGroupCreated}/>
                })
            }
        </div>
        <div className='w-2/6 flex flex-col gap-2'>
            <div className='flex flex-col gap-2 justify-center items-center w-full'>
                <button onClick={()=>{setGroup(true)}} className='rounded-md bg-green-600 p-2 w-2/4 hover:bg-green-700 transition'>
                    <div className="flex justify-center items-center gap-2">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                            </svg>
                        </div>
                        <p className="text-black">Create Group</p>
                    </div>
                </button>
                {
                    group && <div className='flex  items-end gap-2 border border-slate-800 p-2 rounded-md'>
                        <InputBox label={"Group Name"} placeholder='Enter Group name' onChange={(e)=>{setInpGroup(e.target.value)}}/>
                        <PrimaryButton onClick={async()=>{
                            try {
                                await axios.post(`${apiUrl}/room/createroom`,{
                                    roomName: inpGroup,
                                    creatorId: userId
                                })
                                setInpGroup("");
                                setGroup(false);
                                setGroupCreated(x=>!x);
                                setNotification({ msg: "Group Created Successfully", type: "success" });
                            } catch (error:any) {
                                setNotification({ msg: error.response?.data.msg || "Error while Group creation", type: "error" });
                            }

                        }}>Create</PrimaryButton>
                        <LinkButton onClick={()=>{setGroup(false)}}>Cancle</LinkButton>
                    </div>
                }

            </div>
            <div className='flex flex-col gap-2 justify-center items-center w-full'>
                <button onClick={()=>{setJoin(true)}} className='rounded-md bg-blue-600 p-2 w-2/4 hover:bg-blue-700 transition'>
                    <div className="flex justify-center items-center gap-2 ">
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                        <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z" clipRule="evenodd" />
                        </svg>

                        </div>
                        <p className="text-black">Join</p>
                    </div>
                </button>
                {
                    Join && <div className='flex  items-end gap-2 border border-slate-800 p-2 rounded-md'>
                        <InputBox label={"Group PassKey"} placeholder='Enter Group PassKey' onChange={(e)=>{setInpJoin(e.target.value)}}/>
                        <PrimaryButton onClick={async()=>{
                            try {
                                const res=await axios.post(`${apiUrl}/room/joinroom`,{
                                    passkey: inpJoin.trim(),
                                    userId: userId
                                })
                                setInpJoin("");
                                setJoin(false);
                                setNotification({ msg: "Joining Group Successfull", type: "success" });
                                //router.push(`/chats?room=${res.data.result.name}&userId=${userId}`)
                                openLinkInNewTab(`/chats?room=${res.data.result.name}&userId=${userId}`);
                            } catch (error:any) {
                                setNotification({ msg: error.response?.data.msg || "Error while joining Group", type: "error" });
                            }

                        }}>Join</PrimaryButton>
                        <LinkButton onClick={()=>{setJoin(false)}}>Cancle</LinkButton>
                    </div>
                }
            </div>
        </div>
       
    </div>
}