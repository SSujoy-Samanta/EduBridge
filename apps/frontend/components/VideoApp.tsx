'use client'
import { useEffect, useState, useRef } from 'react';
const WSURL = process.env.NEXT_PUBLIC_WSVID_URL;
import { useSession } from 'next-auth/react';
import { audioMutedState, notificationState, videoMutedState } from "@/lib/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
function useSocket(room: string, id: number | null) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (id && room && WSURL) {
      const newSocket = new WebSocket(`${WSURL}?roomName=${room.split('#')[1]}&userId=${id}`);

      newSocket.onopen = () => {
        console.log('WebSocket connected...');
      };

      newSocket.onclose = () => {
        console.log('Socket disconnected');
      };

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [id, room]);

  return socket;
}

function useUserDetails() {
  const { data: session } = useSession();
  const [username, setUsername] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (session) {
      setUsername(session.user?.name || null);
      //@ts-ignore
      const userId = session.user?.id;
      if (typeof userId === 'number') {
        setId(userId);
      } else if (typeof userId === 'string') {
        setId(parseInt(userId, 10));
      } else {
        setId(null);
      }
    }
  }, [session]);

  return { username, id };
}

export const VideoApp = ({
  room = "hello",
  localAudioTrack,
  localVideoTrack,
  toggleVideo,
  toggleAudio
}: {
  room: string;
  localAudioTrack: MediaStreamTrack | null;
  localVideoTrack: MediaStreamTrack | null;
  toggleVideo:()=>void;
  toggleAudio:()=>void;

}) => {
  const { username, id } = useUserDetails();
  const socket = useSocket(room, id);
  const setNotification=useSetRecoilState(notificationState);
  const [sendingPc, setSendingPc] = useState<null | RTCPeerConnection>(null);
  const [receivingPc, setReceivingPc] = useState<null | RTCPeerConnection>(null);
  // const [remoteVideoTrack, setRemoteVideoTrack] = useState<MediaStreamTrack | null>(null);
  // const [remoteAudioTrack, setRemoteAudioTrack] = useState<MediaStreamTrack | null>(null);
  const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [lobby,setLobby]=useState<boolean>(true);
  const videoMuted=useRecoilValue(videoMutedState);
  const audioMuted=useRecoilValue(audioMutedState);

  // Initialize local stream
  useEffect(() => {
    if (localVideoRef.current && localVideoTrack) {
      const stream = new MediaStream([localVideoTrack]);

      localVideoRef.current.srcObject = stream;

      localVideoRef.current.play().catch((error) => {
        if (error.name !== 'AbortError') {
          console.error("Video play failed:", error);
        } else {
          console.log("Video play was interrupted by a new load request");
        }
      });
    }
  }, [localVideoTrack]);

  // Socket logic
  useEffect(() => {
    if (socket) {
      initiateConnection();
      return () => {
        socket.onmessage = null;
      };
    }
  }, [socket, room]);

  const initiateConnection = async () => {
    if (!socket) {
      alert("Socket not found");
      return;
    }

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      const { sdp, roomName, senderId, candidate, types } = message;

      if (message.type === 'joined') {
        console.log("User joined");
        setLobby(false);
        const pc = new RTCPeerConnection();
        setSendingPc(pc);

        // Add tracks
        if (localVideoTrack) {
            console.error("added tack");
            pc.addTrack(localVideoTrack)
        }
        if (localAudioTrack) {
            console.error("added tack");
            pc.addTrack(localAudioTrack)
        }

        // Handle ICE candidate
        pc.onicecandidate = (e) => {
          if (e.candidate) {
            socket.send(
              JSON.stringify({
                type: "add-ice-candidate",
                roomName: roomName,
                senderId: id,
                candidate: e.candidate,
                types: "sender",
              })
            );
          }
        };

        // Handle negotiation
        pc.onnegotiationneeded = async () => {
          const offerSdp = await pc.createOffer();
          await pc.setLocalDescription(offerSdp);

          socket.send(
            JSON.stringify({
              type: "createOffer",
              roomName: roomName,
              sdp: offerSdp,
              senderId: id,
            })
          );
        };

      } else if (message.type === 'createOffer') {
        console.log("Received offer");
        setLobby(false);

        // Create the receiving PeerConnection instance
        const pc = new RTCPeerConnection();
        setReceivingPc(pc); // This just stores the peer connection
        const stream = new MediaStream();
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
        }
        setRemoteMediaStream(stream);
        pc.ontrack = (event) => {
            console.log("ontrack event triggered:", event);
            if (remoteVideoRef.current) {
              // Check if there's already a MediaStream in the video element
               const {track} = event;
                // @ts-ignore
               remoteVideoRef.current.srcObject.addTrack(track)
                // if (track.kind == 'audio') {
                //     setRemoteAudioTrack(track);
                //     // @ts-ignore
                //     remoteVideoRef.current.srcObject.addTrack(track)
                // } else {
                //     setRemoteVideoTrack(track);
                //     // @ts-ignore
                //     remoteVideoRef.current.srcObject.addTrack(track)
                // }
                //@ts-ignore
                remoteVideoRef.current.play();
            }
        };          
        // Set up ICE candidate handler
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.send(
              JSON.stringify({
                type: "add-ice-candidate",
                roomName: roomName,
                senderId: id,
                candidate: event.candidate,
                types: "receiver",
              })
            );
          }
        };

        // Set the remote description (the offer)
        await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));

        // Create the answer SDP and set the local description
        const answerSdp = await pc.createAnswer();
        await pc.setLocalDescription(answerSdp);

        // Send the answer back to the sender
        socket.send(
          JSON.stringify({
            type: "createAnswer",
            roomName: roomName,
            sdp: answerSdp,
            senderId: id,
          })
        );
      } else if (message.type === 'createAnswer') {
        console.log("Received answer");
        setLobby(false);
        setSendingPc((pc) => {
            if (pc) {
                if (pc.signalingState === 'have-local-offer') {
                    const remoteSdp = new RTCSessionDescription(message.sdp);
                    pc.setRemoteDescription(remoteSdp)
                      .then(() => {
                          console.log("Remote description set successfully");
                      })
                      .catch((error) => {
                          console.error("Error setting remote description:", error);
                      });
                } else if (pc.signalingState === 'stable') {
                    console.warn("Peer connection is in stable state. Cannot set remote answer SDP at this time.");
                } else {
                    console.error(`Unexpected signaling state: ${pc.signalingState}`);
                }
            } else {
                console.error("PeerConnection is null or undefined");
            }
    
            return pc; // Returning the current peer connection to keep the state unchanged
        });
    
        console.log("Loop closed");
      } else if (message.type === 'add-ice-candidate') {
        const candidateObj = new RTCIceCandidate(message.candidate);
        console.log("add ice candidate from remote");
        if (types == "sender") {
            setReceivingPc(pc => {
                if (!pc) {
                    //console.error("receicng pc nout found")
                } else {
                    //console.error(pc.ontrack)
                }
                pc?.addIceCandidate(candidateObj)
                return pc;
            });
        } else {
            setSendingPc(pc => {
                if (!pc) {
                    //console.error("sending pc nout found")
                } else {
                    // console.error(pc.ontrack)
                }
                pc?.addIceCandidate(candidateObj)
                return pc;
            });
        }
      }else if (message.type === 'lobby') {
        setLobby(true);
      }else if (message.type === 'left') {
        setNotification({msg:"Your Friend Left The Room",type:"error"});
      }
    };
  };

  return (
    <div className='w-full pt-10 flex flex-col justify-center items-center gap-3'>
      <h1 className='text-rose-700 border rounded-sm p-2 text-center border-slate-600 font-bold'>Room: <span className='text-teal-500'>{room.split('#')[0]}</span></h1>
      <div className='grid grid-cols-2 gap-8'>
        <div className='flex flex-col justify-start items-center w-full border-2 rounded-sm border-slate-800'>
          <div className='font-extralight bg-sky-950 w-full text-center p-1 text-amber-700'>ME</div>
          <div className='w-full h-full'>
            <video autoPlay width={400} height={400} ref={localVideoRef} />
          </div>
        </div>
        <div className='flex flex-col justify-start items-center w-full border-2 rounded-sm border-slate-800'>
          {!lobby?
            <div className='w-full h-full flex justify-center flex-col'>
              <div className='font-extralight bg-sky-950 w-full text-center p-1 text-amber-700'>
                Friend
              </div>
              <div className='w-full h-full'>
                <video autoPlay width={400} height={400} ref={remoteVideoRef} />
              </div>
            </div>
          :
            <div className='w-full h-full flex justify-center flex-col'>
              <div className='font-light bg-sky-950 w-full  text-center p-1 text-red-700 '> Waiting to connect you to someone</div>
              <div role="status" className="flex items-center justify-center h-full w-full bg-gray-300 animate-pulse dark:bg-gray-700 ">
                  <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z"/>
                </svg>
                  <span className="sr-only">Loading...</span>
              </div>

            </div>
          }
        </div>
      </div>
      <div className='flex gap-10 items-center justify-around p-2 mt-16 border rounded-md border-slate-800 w-1/4 bg-slate-800'>
        
        <button className='bg-sky-700 p-2 rounded-full hover:bg-sky-800 transition' onClick={toggleAudio}>
        {audioMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="black" className="size-6">
              <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 21.2-5.1 41.1-14.2 58.7L416 300.8 416 96c0-53-43-96-96-96s-96 43-96 96l0 54.3L38.8 5.1zM344 430.4c20.4-2.8 39.7-9.1 57.3-18.2l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128l0-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6z" />
            </svg>
            
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
              <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
              <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
            </svg>
          )}

        </button>
        <button className='p-2 rounded-full bg-gray-500 hover:bg-gray-700 transition' onClick={toggleVideo}>
          {videoMuted?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
            <path d="M.97 3.97a.75.75 0 0 1 1.06 0l15 15a.75.75 0 1 1-1.06 1.06l-15-15a.75.75 0 0 1 0-1.06ZM17.25 16.06l2.69 2.69c.944.945 2.56.276 2.56-1.06V6.31c0-1.336-1.616-2.005-2.56-1.06l-2.69 2.69v8.12ZM15.75 7.5v8.068L4.682 4.5h8.068a3 3 0 0 1 3 3ZM1.5 16.5V7.682l11.773 11.773c-.17.03-.345.045-.523.045H4.5a3 3 0 0 1-3-3Z" />
          </svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
            <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
          </svg>
        
          }
        </button>
        <button className='bg-red-600 rounded-full p-2 hover:bg-red-800 transition' onClick={()=>{
          window.close();
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" className="size-5">
            <path fillRule="evenodd" d="M3.5 2A1.5 1.5 0 0 0 2 3.5V5c0 1.149.15 2.263.43 3.326a13.022 13.022 0 0 0 9.244 9.244c1.063.28 2.177.43 3.326.43h1.5a1.5 1.5 0 0 0 1.5-1.5v-1.148a1.5 1.5 0 0 0-1.175-1.465l-3.223-.716a1.5 1.5 0 0 0-1.767 1.052l-.267.933c-.117.41-.555.643-.95.48a11.542 11.542 0 0 1-6.254-6.254c-.163-.395.07-.833.48-.95l.933-.267a1.5 1.5 0 0 0 1.052-1.767l-.716-3.223A1.5 1.5 0 0 0 4.648 2H3.5Zm9.78.22a.75.75 0 1 0-1.06 1.06L13.94 5l-1.72 1.72a.75.75 0 0 0 1.06 1.06L15 6.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L16.06 5l1.72-1.72a.75.75 0 0 0-1.06-1.06L15 3.94l-1.72-1.72Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      
   
    </div>
  );
};
