"use client";
import { useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { InstagramIcon } from "./CustomSvg/Insta";
import { FaceBookIcon } from "./CustomSvg/Facebook";
import { TwitterIcon } from "./CustomSvg/Twitter";
import { LinkedInSvg } from "./CustomSvg/Linkdin";
import { EmailSvg } from "./CustomSvg/Email";

export const Footer = () => {
  const handleOpenNewTab = (path: string) => {
    window.open(path, "_blank");
  };
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  return (
    <div className="p-5 pl-0 bottom-0 flex flex-col bg-gradient-to-r from-cyan-900  to-sky-900 w-full text-white items-end lg:text-base sm2:text-sm xxs:text-xs">
      <div className="grid lg:grid-cols-3 md:grid-cols-1 w-full">
        <div className=" col-span-1 flex flex-col justify-start items-start w-full p-2 ">
          <div className="">
            <Logo />
          </div>
          <div className="flex break-words md:pl-20 sm2:pl-12 xxs:pl-4 font-medium sm2:text-base xxs:text-sm text-slate-500">
            The Bridge Between Freshers And Alumni
          </div>
        </div>
        <div className="flex flex-row w-full gap-4 p-2 col-span-2 ">
          <div className="flex flex-col w-full gap-4 p-2 xl:ml-0 sm2:ml-10">
            <div className="lg:text-lg sm2:text-base xxs:text-xs text-blue-600 font-bold">
              HELPFULL LINKS
            </div>
            <div className="flex flex-col">
              <HelpLinks
                text="Dashboard"
                onClick={() => {
                  router.push("/dashboard");
                }}
              />
              <HelpLinks
                text="Profile"
                onClick={() => {
                  router.push("/dashboard/profile");
                }}
              />
              <HelpLinks
                text="Start Meeting"
                onClick={() => {
                  handleOpenNewTab("/videocall");
                }}
              />
              <HelpLinks
                text="Privacy Policy"
                onClick={() => {
                  router.push("/privacypolicy");
                }}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 p-2 xl:ml-0 sm2:ml-10 text-purple-500">
            <div className="lg:text-lg sm2:text-base xxs:text-xs text-blue-600 font-bold">
              CONNECT WITH US
            </div>
            <div className="grid grid-cols-4 lg:w-2/6 md:w-3/6 sm2:w-4/6 xxs:w-4/5 pl-2 gap-1 sm2:gap-y-8 xxs:gap-y-4">
              <div className="flex justify-center items-center  cursor-pointer">
                <InstagramIcon
                  onClick={() => {
                    handleOpenNewTab("https://www.instagram.com/");
                  }}
                />
              </div>
              <div className="flex  justify-center items-center  cursor-pointer">
                <FaceBookIcon
                  onClick={() => {
                    handleOpenNewTab("https://www.facebook.com/");
                  }}
                />
              </div>
              <div className="flex justify-center items-center  cursor-pointer">
                <TwitterIcon
                  onClick={() => {
                    handleOpenNewTab("https://www.twitter.com/");
                  }}
                />
              </div>
              <div className="flex justify-center items-center  cursor-pointer">
                <LinkedInSvg
                  onClick={() => {
                    handleOpenNewTab("https://in.linkedin.com/");
                  }}
                />
              </div>
              <div className="col-span-4 flex flex-col items-center justify-center">
                <EmailSvg />
                <p className="font-bold  ">sujoysamanta.project@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="pt-4 text-black font-bold text-center w-full bottom-0">
        <p>&copy; {currentYear} EduBridge. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const HelpLinks = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex justify-start items-center p-1 pl-0 gap-2 text-indigo-400 cursor-pointer"
      onClick={onClick}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>{text}</div>
    </div>
  );
};
