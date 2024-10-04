"use client";
import { useEffect, useRef, useState } from "react";
import { VideoApp } from "./VideoApp";
import { InputBox } from "./InputBox";
import {
  audioMutedState,
  notificationState,
  videoMutedState,
} from "@/lib/atom";
import { useSetRecoilState } from "recoil";
import { generatePasskey } from "@/lib/room/passkeyGeneration";
import { SecondaryButton } from "./Buttons/SecondaryButton";

export const Landing = () => {
  const setNotification = useSetRecoilState(notificationState);
  const setAudiomuted = useSetRecoilState(audioMutedState);
  const setVideoMuted = useSetRecoilState(videoMutedState);
  const [room, setRoom] = useState("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [localAudioTrack, setLocalAudioTrack] =
    useState<MediaStreamTrack | null>(null);
  const [localVideoTrack, setLocalVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [joined, setJoined] = useState(false);
  const [isClient, setIsClient] = useState(false); // To check if we are on the client side
  const [creat, setCreate] = useState<boolean>(false);
  const [key, setKey] = useState("");
  const [passkey, setPasskey] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };
  useEffect(() => {
    // Mark that the component is mounted on the client side
    setIsClient(true);
  }, []);

  const getCam = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert(
        "Your browser does not support accessing the camera or microphone.",
      );
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(stream);
    const audioTrack = stream.getAudioTracks()[0];
    const videoTrack = stream.getVideoTracks()[0];
    setLocalAudioTrack(audioTrack);
    setLocalVideoTrack(videoTrack);

    if (videoRef.current) {
      videoRef.current.srcObject = new MediaStream([videoTrack]);
      videoRef.current.play();
    }
  };
  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        // console.log("vid11")
        console.log(videoTrack.enabled);
        videoTrack.enabled = !videoTrack.enabled; // Toggle video on/off
        // console.log("vid22")
        console.log(videoTrack.enabled);
        setVideoMuted(!videoTrack.enabled);
        setIsVideoMuted(!videoTrack.enabled);
      }
    }
  };

  // Mute/Unmute Audio
  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        // console.log("aud")
        console.log(audioTrack.enabled);
        audioTrack.enabled = !audioTrack.enabled;
        // console.log("aud222")
        console.log(audioTrack.enabled);
        setAudiomuted(!audioTrack.enabled); // Toggle audio on/off
        setIsAudioMuted(!audioTrack.enabled);
      }
    }
  };

  async function passkeyGen(room: string): Promise<string> {
    let pass = await generatePasskey();
    return room + "#" + pass;
  }

  useEffect(() => {
    if (isClient && videoRef.current) {
      alert("ONLY TWO USER CAN BE JOINED AT A TIME IN THE MEETING.");
      getCam();
    }
  }, [isClient]);
  if (!joined) {
    return (
      <div className="flex md:flex-row xxs:flex-col w-full md:items-start xxs:items-center justify-center lg:pt-20 md:pt-16 sm:pt-14 xxs:pt-10 gap-4 md:text-base sm:text-sm xxs:text-xs">
        {isClient && (
          <div className=" flex justify-center items-center p-2 rounded-md  border-2 border-cyan-600 lg:w-2/6 md:w-3/6 sm2:w-3/5 xxs:w-4/5  ">
            {
              <video
                className="rounded-md w-full"
                autoPlay
                ref={videoRef}
              ></video>
            }
          </div>
        )}
        <div className="xl:w-1/5 lg:w-2/6 md:w-2/6 sm2:w-3/5 xxs:w-4/5">
          <div className="w-full flex flex-col justify-center gap-2">
            <SecondaryButton
              onClick={() => {
                setCreate((x) => !x);
              }}
            >
              Create Room
            </SecondaryButton>
            {creat && (
              <div className="flex justify-start items-end gap-2 w-full ">
                <InputBox
                  label="Room Name"
                  placeholder="Enter Room Name"
                  onChange={(e) => setRoom(e.target.value)}
                />
                <button
                  className="border border-slate-700 p-2 rounded-md"
                  onClick={async () => {
                    if (room) {
                      setNotification({
                        msg: `${room} created successfully`,
                        type: "success",
                      });
                      const x = await passkeyGen(room);
                      setPasskey(x);
                      setCreate(false);
                    } else {
                      setNotification({
                        msg: "Invalid Room name",
                        type: "error",
                      });
                    }
                  }}
                >
                  Create
                </button>
              </div>
            )}
            {passkey && (
              <div className="flex items-center gap-2 font-mono text-slate-800">
                <div className="bg-cyan-700 p-1 rounded-md cursor-pointer text-sm">
                  Passkey
                </div>
                <button
                  onClick={() => {
                    if (passkey) {
                      handleCopy(passkey);
                    }
                  }}
                  className="p-1 bg-stone-800 text-white text-sm px-2 rounded-md hover:bg-stone-900 transition"
                >
                  {isCopied ? (
                    "Copied!"
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="white"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-start items-end gap-2 w-full ">
            <InputBox
              label="Join Meeting"
              placeholder="Enter The Passkey"
              onChange={(e) => setKey(e.target.value)}
            />
            <button
              className="border border-slate-700 p-2 rounded-md"
              onClick={() => {
                if (
                  key &&
                  key.includes("#") &&
                  key.split("#")[1]?.length === 10
                ) {
                  setNotification({
                    msg: `Joining the Room: ${key.split("#")[0]}`,
                    type: "success",
                  });
                  setJoined(true);
                } else {
                  setNotification({ msg: "Invalid Passkey", type: "error" });
                }
              }}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <VideoApp
      room={key}
      localAudioTrack={localAudioTrack}
      localVideoTrack={localVideoTrack}
      toggleVideo={toggleVideo}
      toggleAudio={toggleAudio}
    />
  );
};
