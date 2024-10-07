"use client";
import { useState } from "react";
import { InputBox } from "./InputBox";
import { SecondaryButton } from "./Buttons/SecondaryButton";
import { states } from "@/utils/states";
import axios from "axios";
import { useRouter } from "next/navigation";
import { degrees } from "@/utils/course";
import Age from "@/utils/age";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation';

export const EmailSignUp = () => {
  const setNotification = useSetRecoilState(notificationState);
  const router = useRouter();
  const searchParams = useSearchParams(); // Get the search params (query parameters)
  const [country, setCountry] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [username, setusername] = useState<string>("");
  const [email, setemail] = useState<string|null>(searchParams.get('email'));
  const [password, setpassword] = useState<string>("");
  const [mobile, setmobile] = useState<string>("");
  const [Affiliates, setAffiliates] = useState<string>("");
  const [city, setcity] = useState<string>("");
  const [currEducation, setcurrEducation] = useState<string>("");
  const [pastEducation, setpastEducation] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  
  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(event.target.value);
  };
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
  };
  const handleAffiliatesChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setAffiliates(event.target.value);
  };
  const handleCurrEducation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setcurrEducation(event.target.value);
  };
  const handlePaseEducation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setpastEducation(event.target.value);
  };
  const handleSignIn = async () => {
    // Sign in using the credentials provider
    const res = await signIn("credentials", {
      redirect: false, // Set to true if you want to redirect to the callback URL automatically
      email,
      password,
      callbackUrl: "", // Change this to the desired post-login page
    });
    if (res?.error) {
      setNotification({ msg: "Invalid credentials", type: "error" });
    } else if (res?.ok) {
      router.push("/dashboard");
      setNotification({ msg: "Sign-Up successful", type: "success" });
    }
  };
  if(!email){
    router.push("/signup");
  }
  return (
    <div className="w-3/5 flex h-full flex-col justify-center gap-2  bg-sky-950 p-3 rounded-md border border-cyan-300 xxs:w-11/12 mb-4 md:w-4/5 xl:w-3/5 sm2:text-base xxs:text-xs">
      <form className="flex justify-between gap-2 lg:flex-nowrap xxs:flex-wrap">
        <div className="flex justify-center items-center flex-col w-full p-2 ">
          <InputBox
            label={"Username"}
            placeholder={"Enter Username"}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <InputBox
            label="Email"
            value={email ||''}
            placeholder={"name@gmail.com"}
            onChange={(e) => {
            }}
          />
          <InputBox
            label={"Password"}
            placeholder={"Enter Your Password"}
            type={"password"}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <InputBox
            label={"Mobile No"}
            placeholder={"+91 123-456-7890"}
            onChange={(e) => {
              setmobile(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center  flex-col p-2 pl-5 xxs:pl-1 ">
          <div className="flex justify-between p-2 xxs:flex-col xxs:gap-2 sm2:flex-row sm:justify-between">
            <div className="flex justify-start gap-2 items-center">
              <label
                className="font-bold text-amber-700"
                htmlFor="country-selector"
              >
                Affiliates
              </label>
              <select
                name="Affiliates"
                id="affiliates-selector"
                onChange={handleAffiliatesChange}
                value={Affiliates || ""}
                className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
              >
                <option value="">Affiliates</option>
                <option value="freshers">Freshers</option>
                <option value="alumni">Alumni</option>
                {/* Add more options here if needed */}
              </select>
            </div>
            <div className="flex gap-2 items-center ">
              <label
                className="font-bold text-amber-700"
                htmlFor="age-selector"
              >
                Age
              </label>
              <select
                name="age"
                id="age-selector"
                onChange={handleAgeChange}
                value={age || ""}
                className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
              >
                <option value="">Age</option>
                {Age.map((x, ind) => {
                  return (
                    <option value={x} key={ind}>
                      {x}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex justify-between p-2 gap-3 xxs:flex-col xxs:gap-2 sm:flex-row">
            <div className="flex gap-2 items-center">
              <label
                className="font-bold text-amber-700"
                htmlFor="currEducation-selector"
              >
                Present
              </label>
              <select
                name="currEducation"
                id="currEducation-selector"
                onChange={handleCurrEducation}
                value={currEducation || ""}
                className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
              >
                <option value="">Degrees</option>
                <option value="Passed out">Passed Out</option>
                {degrees.map((x, ind) => {
                  return (
                    <option value={x} key={ind}>
                      {x}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex gap-2 items-center ">
              <label
                className="font-bold text-amber-700"
                htmlFor="pastEducation-selector"
              >
                Past
              </label>
              <select
                name="pastEducation"
                id="pastEducation-selector"
                onChange={handlePaseEducation}
                value={pastEducation || ""}
                className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
              >
                <option value="">Degrees</option>
                {degrees.map((x, ind) => {
                  return (
                    <option value={x} key={ind}>
                      {x}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex justify-between p-2 xxs:flex-col xxs:gap-2 sm:flex-row">
            <div className="flex justify-start gap-2 items-center">
              <label
                className="font-bold text-amber-700"
                htmlFor="country-selector"
              >
                Country
              </label>
              <select
                name="Country"
                id="country-selector"
                onChange={handleChange}
                value={country || ""}
                className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
              >
                <option value="">Country</option>
                <option value="india">India</option>
                {/* Add more options here if needed */}
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <label
                className="font-bold text-amber-700"
                htmlFor="state-selector"
              >
                State
              </label>
              <select
                name="State"
                id="state-selector"
                onChange={handleStateChange}
                value={state || ""}
                className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
              >
                <option value="">State</option>
                {states.map((x, ind) => {
                  return (
                    <option value={x} key={ind}>
                      {x}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <InputBox
            label={"City"}
            placeholder={"Enter your city"}
            onChange={(e) => {
              setcity(e.target.value);
            }}
          />
        </div>
      </form>
      <div className="p-2 pl-8 flex justify-start gap-3 xxs:pl-2">
        <div className="flex items-center">
          <input
            id="link-checkbox"
            type="checkbox"
            onClick={() => {
              setChecked((x) => !x);
            }}
            className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="link-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the
            <a
              onClick={() => {
                router.push("/privacypolicy");
              }}
              className="text-blue-600 dark:text-blue-500 hover:underline pl-1 cursor-pointer"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>
      </div>
      <div className="flex justify-start pl-7 gap-1 items-center cursor-pointer xxs:pl-2">
        <div className="w-7 h-7 flex justify-start items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>
        <div
          className="text-zinc-600 underline font-semibold"
          onClick={() => {
            router.push("/signin");
          }}
        >
          I already have an account
        </div>
      </div>
      <div className="flex justify-center items-center p-2">
        <div className="flex justify-center items-center">
          <SecondaryButton
            onClick={async () => {
              if (
                username &&
                email &&
                password &&
                mobile &&
                Affiliates &&
                age &&
                currEducation &&
                pastEducation &&
                country &&
                state &&
                city
              ) {
                try {
                  if (checked) {
                    const res = await axios.post(`${apiUrl}/signup`, {
                      username: username,
                      email: email.trim(),
                      password: password,
                      mobile: mobile.trim(),
                      affiliates: Affiliates,
                      age: age,
                      currDegree: currEducation,
                      pastDegree: pastEducation,
                      country: country,
                      state: state,
                      city: city,
                    });
                    setNotification({ msg: res.data.msg, type: "success" });
                    await handleSignIn();
                  } else {
                    setNotification({
                      msg: "Before signing up you have to accept all terms and service.",
                      type: "error",
                    });
                  }
                } catch (e: any) {
                  console.log(e.response?.data?.errors);
                  setNotification({
                    msg:
                      e.response?.data?.errors[0]?.message ||
                      e.response?.data?.msg,
                    type: "error",
                  });
                }
              } else {
                setNotification({
                  msg: "Please Fill Up Credentials Correctly",
                  type: "error",
                });
              }
            }}
          >
            SignUp
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};
