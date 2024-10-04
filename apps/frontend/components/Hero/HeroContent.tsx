"use client";
import Typewriter from "typewriter-effect";
export const HeroContent = () => {
  return (
    <>
      <h2 className="sm:text-6xl xxs:text-4xl font-extrabold mb-8 mt-6 animate-bounce italic">
        <span className="text-transparent bg-clip-text bg-gradient-to-t to-black via-blue-700 from-white p-2">
          Connecting
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-t to-black via-blue-700 from-white p-2">
          {" "}
          Freshers
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-t to-black via-blue-700 from-white p-2">
          {" "}
          &amp;
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-t to-black via-blue-700 from-white p-2">
          {" "}
          Alumni
        </span>
      </h2>
      <div className="sm:text-xl xxs:text-base text-gray-400 mb-8 leading-relaxed items-center p-2 h-full">
        EduBridge brings a platform where freshers and alumni can connect,
        collaborate, and grow together. Join us for
        <div className="text-sky-400 text-3xl h-8 mt-4">
          <Typewriter
            options={{
              strings: ["Guidance", "Chat", "Video Calls"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
    </>
  );
};
