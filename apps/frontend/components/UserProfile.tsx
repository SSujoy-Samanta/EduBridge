"use client";
import axios from "axios";
import { UpdateProfile } from "./UpdateProfile";
import { UserDetailsRow } from "./UserDetailsRow";
import { useState, useEffect } from "react";
import Loading from "@/app/loading";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const UserProfile = ({
  userDetail,
  userId,
}: {
  userDetail: any;
  userId: number;
}) => {
  const setNotification = useSetRecoilState(notificationState);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState(userDetail);

  useEffect(() => {
    // Only fetch data when refetch is set to true (skip on initial mount)
    if (refetch) {
      const fetchUserInfo = async () => {
        try {
          const res = await axios.get(`${apiUrl}/profile?id=${userId}`);
          setUserDetails(res.data.userDetail);
        } catch (e: any) {
          console.log("Error While Fetching Data");
        } finally {
          // Reset refetch to false after fetching
          setRefetch(false);
        }
      };
      if (userId) {
        fetchUserInfo();
      }
    }
  }, [refetch,userId]);
  if (!userDetails) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="flex w-full h-full flex-col gap-2 ">
      <div className="flex justify-center items-center">
        <UpdateProfile setRefetch={setRefetch} />
      </div>
      <div className="flex w-full h-full gap-4 lg:text-base sm:text-sm xxs:text-xs xl:flex-row xxs:flex-col justify-center xl:items-start xxs:items-center ">
        <div className="xl:w-2/5 sm2:w-5/6 xxs:w-full h-full rounded-md p-2 flex flex-col gap-2 overflow-auto">
          <UserDetailsRow label={"Username"} details={userDetails.name} />
          <UserDetailsRow label={"Email"} details={userDetails.email} />
          <UserDetailsRow label={"Phone No"} details={userDetails.mobile} />
          <UserDetailsRow
            label={"Affiliates"}
            details={userDetails.affiliates}
          />
          <UserDetailsRow label={"Age"} details={userDetails.age} />
          <UserDetailsRow
            label={"Present-Degree"}
            details={userDetails.currDegree}
          />
          <UserDetailsRow
            label={"Past-Degree"}
            details={userDetails.pastDegree}
          />
        </div>
        <div className="xl:w-3/5 sm2:w-5/6 xxs:w-full h-full rounded-md p-2 flex flex-col gap-2 overflow-auto">
          {userDetails.school.length > 0 ? (
            userDetails.school.map((x: any, ind: number) => {
              return (
                <UserDetailsRow
                  key={ind}
                  label={"School"}
                  details={x.name}
                  degree={x.degree}
                  onClick={async () => {
                    try {
                      let name = x.name;
                      let degree = x.degree;
                      if (userId && name && degree) {
                        await axios.delete(`${apiUrl}/updatedetail/school`, {
                          data: {
                            userId,
                            name,
                            degree,
                          },
                        });
                        setRefetch((x) => !x);
                        setNotification({
                          msg: `School: ${name} removed Successfull.`,
                          type: "success",
                        });
                      }
                    } catch (error: any) {
                      setNotification({
                        msg: `School: ${x.name} not removed.`,
                        type: "error",
                      });
                    }
                  }}
                />
              );
            })
          ) : (
            <UserDetailsRow label={"School"} details={null} />
          )}
          {userDetails.college.length > 0 ? (
            userDetails.college.map((x: any, ind: number) => {
              return (
                <UserDetailsRow
                  key={ind}
                  label={"College"}
                  details={x.name}
                  degree={x.degree}
                  onClick={async () => {
                    try {
                      let name = x.name;
                      let degree = x.degree;
                      if (userId && name && degree) {
                        await axios.delete(`${apiUrl}/updatedetail/college`, {
                          data: {
                            userId,
                            name,
                            degree,
                          },
                        });
                        setRefetch((x) => !x);
                        setNotification({
                          msg: `College: ${name} removed Successfull.`,
                          type: "success",
                        });
                      }
                    } catch (error: any) {
                      setNotification({
                        msg: `College: ${x.name} not removed.`,
                        type: "error",
                      });
                    }
                  }}
                />
              );
            })
          ) : (
            <UserDetailsRow label={"College"} details={null} />
          )}
        </div>
      </div>
    </div>
  );
};
