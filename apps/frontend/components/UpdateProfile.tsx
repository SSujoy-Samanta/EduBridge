"use client";
import axios from "axios";
import { useState } from "react";
import { InputBox } from "./InputBox";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const UpdateProfile = ({
  setRefetch,
}: {
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [Toggle, setToggle] = useState<boolean>(false);
  const [type, setType] = useState<"Add" | "Edit" | "">("");
  return (
    <div className="flex justify-center items-center ">
      <div className="flex justify-start items-center xxs:mt-2 sm:mt-0 ">
        <button
          onClick={() => {
            setType("Edit");
            setToggle(true);
          }}
          data-modal-target="popup-modal"
          data-modal-toggle="popup-modal"
          className=" cursor-pointer block text-black bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium  text-sm px-5 rounded-l-lg py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
          type="button"
        >
          Edit
        </button>
        <button
          onClick={() => {
            setType("Add");
            setToggle(true);
          }}
          data-modal-target="popup-modal"
          data-modal-toggle="popup-modal"
          className="cursor-pointer block text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 rounded-r-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Add
        </button>
      </div>
      {Toggle && (
        <UserUpdateModal
          setToggle={setToggle}
          setRefetch={setRefetch}
          type={type}
        />
      )}
    </div>
  );
};

export const UserUpdateModal = ({
  setToggle,
  type,
  setRefetch,
}: {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  type: "Add" | "Edit" | "";
}) => {
  const ADD = ["School", "College"];
  const EDIT = ["username", "age", "mobile no"];
  const [data, setData] = useState("");
  const [input, setInput] = useState<string>("");
  const [Degree, setDegree] = useState<string>("");
  //const [add,setAdd]=useState<boolean>(false);
  const setNotification = useSetRecoilState(notificationState);
  const { data: session } = useSession();
  let userId: number;
  if (session) {
    //@ts-ignore
    userId = parseInt(session.user?.id);
  }

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setToggle((x) => !x);
  };

  const handleClickInside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
  };
  async function onSubmitData(
    type: string,
    body: any,
    selected: string,
  ): Promise<boolean> {
    if (type === "Add") {
      const { Degree, input } = body;
      let name = input;
      //console.log(input)
      let degree = Degree;
      //console.log(Degree)
      try {
        await axios.post(`${apiUrl}/updatedetail/${selected.toLowerCase()}`, {
          userId,
          name,
          degree,
        });
        setNotification({
          msg: `${selected} Addition successfully`,
          type: "success",
        });
        return true;
      } catch (e: any) {
        setNotification({
          msg: `${selected} Addition unsuccessfully`,
          type: "error",
        });
        console.log(e);
        return false;
      }
    } else if (type === "Edit") {
      const { input } = body;
      let name: string | undefined;
      let age: number | undefined;
      let mobile: string | undefined;

      try {
        if (selected === "age") {
          age = Number(input);
          await axios.put(`${apiUrl}/updatedetail/age`, {
            userId,
            age,
          });
        } else if (selected === "username") {
          name = input;
          await axios.put(`${apiUrl}/updatedetail/username`, {
            userId,
            name,
          });
        } else {
          mobile = input;
          await axios.put(`${apiUrl}/updatedetail/mobile`, {
            userId,
            mobile,
          });
        }
        // await axios.put(`${apiUrl}/updatedetail/${selected.toLowerCase()}`, {
        //   userId,
        //   [selected === "age" ? "age" : "name"]: selected === "age" ? age : name // Use the correct field based on the selected option
        // });
        setNotification({
          msg: `${selected} updated successfully`,
          type: "success",
        });
        return true;
      } catch (e: any) {
        setNotification({ msg: `${selected} update failed`, type: "error" });
        console.error(e);
        return false;
      }
    }
    return false;
  }
  return (
    <div>
      <div
        id="popup-modal"
        className="fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        onClick={handleClickOutside}
      >
        <div className="absolute flex justify-center items-center left-0 sm:p-2 xxs:p-1 top-16 w-full  max-h-full">
          <div
            className=" flex justify-center items-center xl:w-2/5 lg:w-2/5 sm2:w-3/5 xxs:w-full max-h-full sm:text-base xxs:text-xs"
            onClick={handleClickInside}
          >
            <div
              className="flex flex-col relative bg-white rounded-lg shadow dark:bg-slate-800 dark:bg-opacity-90 w-full sm:m-0 xxs:mx-2"
              onClick={handleClickInside}
            >
              <div className="flex w-full gap-2 items-start">
                <div className=" flex justify-center items-center text-center pl-2 p-1 m-1">
                  <p className="font-semibold text-amber-700">{`${type} Your Details`}</p>
                </div>
                <button
                  type="button"
                  className="flex items-center m-1  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto  justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                  onClick={() => {
                    setToggle((x) => !x);
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="w-full flex justify-start items-center p-2 gap-2">
                <div className="text-black">
                  <select
                    name="select-opt"
                    value={data || ""}
                    onChange={(e) => {
                      setData(e.target.value);
                    }}
                    className="text-white rounded-md bg-neutral-800 border border-cyan-900 p-1"
                  >
                    <option value="">SELECT</option>
                    {type === "Add"
                      ? ADD.map((x: string, ind: number) => (
                          <option value={x} key={ind}>
                            {x.toUpperCase()}
                          </option>
                        ))
                      : EDIT.map((x: string, ind: number) => (
                          <option value={x} key={ind}>
                            {x.toUpperCase()}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
              <div className="p-2 md:p-2 mb-2  flex justify-center flex-col gap-1 w-full">
                {type === "Add" && (
                  <div className="w-5/6">
                    <InputBox
                      onChange={(e) => {
                        setDegree(e.target.value);
                      }}
                      label={`Degree`}
                      placeholder={`Ex:-HS/Btech,MBBS`}
                    />
                  </div>
                )}
                <div className="p-2 md:p-2 mb-2  flex justify-center items-end gap-1 w-full">
                  <InputBox
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                    label={`${data || "Details"}`}
                    placeholder={`Enter your ${data || "details"}`}
                  />
                  <button
                    className="border rounded-md p-2 bg-blue-700 border-blue-800 hover:bg-blue-800 transition w-2/12"
                    onClick={async () => {
                      try {
                        if (
                          type === "Add" &&
                          userId &&
                          input.trim() &&
                          Degree
                        ) {
                          const res = await onSubmitData(
                            type,
                            {
                              Degree,
                              input,
                            },
                            data,
                          );
                          if (res) {
                            setData("");
                            setInput("");
                            setDegree("");
                            setToggle((x) => !x);
                            setRefetch((x) => !x);
                          }
                        } else if (type === "Edit" && userId && input.trim()) {
                          const res = await onSubmitData(
                            type,
                            {
                              input,
                            },
                            data,
                          );
                          if (res) {
                            setData("");
                            setInput("");
                            setToggle((x) => !x);
                            setRefetch((x) => !x);
                          }
                        }
                      } catch (error: any) {
                        setNotification({ msg: `Error while ${type} details` });
                      }
                    }}
                  >
                    {type === "Edit" ? "Submit" : type}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
