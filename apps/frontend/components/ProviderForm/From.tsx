"use client";
import { useState } from "react";
import { CheckBoxInput } from "./CheckBoxInput";
import { DegreeInp } from "./DegreeInp";
import { states } from "@/utils/states";
import { Logo } from "../Logo";
import { SecondaryButton } from "../Buttons/SecondaryButton";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";
import { useRouter } from "next/navigation";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const From = ({ userId }: { userId: number }) => {
  const setNotification = useSetRecoilState(notificationState);
  const router = useRouter();
  const [Affiliates, setAffiliates] = useState<string>("");
  const [currEducation, setcurrEducation] = useState<string>("");
  const [pastEducation, setpastEducation] = useState<string>("");
  const [country, setCountry] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [city, setcity] = useState<string>("");
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
  };
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="relative inline-block border-animate rounded-md mx-2 2xl:w-3/6 xl:w-4/6 sm:w-5/6 xxs:w-full">
        <div className=" bg-slate-900 p-3 grid md:grid-cols-2 xxs:grid-cols-1 rounded-md md:text-base xxs:text-sm">
          <div className="md:col-span-2 py-2 px-1 border-b border-teal-500 flex items-center justify-start gap-2">
            <Logo />
            <div>
              <p className="lg:text-2xl md:text-xl xxs:text-base font-semibold text-blue-600">
                Pre-Request Form
              </p>
            </div>
          </div>
          <div>
            <CheckBoxInput
              affiliate={Affiliates}
              setAffiliate={setAffiliates}
            />
          </div>
          <div>
            <DegreeInp
              setcurrEducation={setcurrEducation}
              setpastEducation={setpastEducation}
              currEducation={currEducation}
              pastEducation={pastEducation}
            />
          </div>
          <div className="lg:col-span-2">
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
                  onChange={handleCountryChange}
                  value={country || ""}
                  className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
                >
                  <option value="">Country</option>
                  <option value="india">India</option>
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
            <div className="lg:w-3/6 md:w-4/6 xxs:w-5/6  flex flex-col gap-1">
              <label className=" text-amber-700 font-bold">City</label>
              <input
                className="p-2 rounded-md border border-gray-800 bg-cyan-800"
                placeholder={"Enter your city"}
                onChange={(e) => {
                  setcity(e.target.value);
                }}
              />
            </div>
            <div className="w-full flex justify-center items-center p-1 pt-3 ">
              <SecondaryButton
                onClick={async () => {
                  if (
                    Affiliates &&
                    currEducation &&
                    pastEducation &&
                    country &&
                    state &&
                    city
                  ) {
                    try {
                      if (userId) {
                        const res = await axios.put(`${apiUrl}/adduserinfo`, {
                          id: userId,
                          affiliates: Affiliates,
                          currDegree: currEducation,
                          pastDegree: pastEducation,
                          country: country,
                          state: state,
                          city: city,
                        });
                        router.push("/dashboard");
                        setNotification({ msg: res.data.msg, type: "success" });
                      }
                    } catch (e: any) {
                      console.log(e.response?.data?.errors);
                      setNotification({
                        msg:
                          e.response?.data?.errors[0].message ||
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
                submit
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
