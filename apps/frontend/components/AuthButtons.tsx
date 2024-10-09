"use client";
import { LinkButton } from "./Buttons/LinkButton";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { Profile } from "./Profile";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SecondaryButton } from "./Buttons/SecondaryButton";
import { useState } from "react";
import { ProfileModal } from "./ProfileModal";

export const AuthButtons = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();
  const username = session.data?.user?.name || "unknown";
  const email = session.data?.user?.email || "unknown@gmail.com";
  return (
    <div>
      {session.data !== null ? (
        <div className="flex justify-evenly items-center gap-2 text-white">
          <div className="flex gap-2 sm:flex xxs:hidden ">
            <SecondaryButton
              onClick={() => {
                router.push("/room");
              }}
            >
              <div className="flex items-center gap-1">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3c-4.31 0-8 3.033-8 7 0 2.024.978 3.825 2.499 5.085a3.478 3.478 0 0 1-.522 1.756.75.75 0 0 0 .584 1.143 5.976 5.976 0 0 0 3.936-1.108c.487.082.99.124 1.503.124 4.31 0 8-3.033 8-7s-3.69-7-8-7Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-2-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </SecondaryButton>
            <PrimaryButton
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM14 14h7v7h-7v-7zM3 14h7v7H3v-7z"
                  />
                </svg>
              </div>
            </PrimaryButton>
          </div>
          <div className="">
            <Profile
              onClick={() => {
                setToggle((x) => !x);
              }}
              userName={`${username}`}
            />
            {toggle && (
              <ProfileModal
                username={username}
                email={email}
                setToggle={setToggle}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-evenly items-center gap-2">
          <PrimaryButton
            onClick={() => {
              router.push("/signin");
            }}
          >
            LOG IN
          </PrimaryButton>
          <LinkButton
            onClick={() => {
              router.push("/signup");
            }}
          >
            SIGN UP
          </LinkButton>
        </div>
      )}
    </div>
  );
};
