'use client'
import { useState } from "react";
import { InputBox } from "./InputBox"
import { SecondaryButton } from "./Buttons/SecondaryButton";
import { states } from "@/utils/states";
import axios from "axios";
import { useRouter } from "next/navigation";
import { degrees } from "@/utils/course";
import Age from "@/utils/age";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";
const apiUrl=process.env.NEXT_PUBLIC_API_URL
export const SignUp=()=>{
    const setNotification = useSetRecoilState(notificationState);
    const router=useRouter();
    const [country, setCountry] = useState<string | null>(null);
    const [state, setState] = useState<string | null>(null);
    const [username, setusername] = useState<string>("");
    const [email, setemail] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [mobile, setmobile] = useState<string>("");
    const [Affiliates, setAffiliates] = useState<string>("");
    const [city, setcity] = useState<string>("");
    const [currEducation, setcurrEducation] = useState<string>("");
    const [pastEducation, setpastEducation] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [checked,setChecked]=useState<boolean>(false);
    const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAge(event.target.value);
    };
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCountry(event.target.value);
    };
    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setState(event.target.value);
    };
    const handleAffiliatesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAffiliates(event.target.value);
    };
    const handleCurrEducation = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setcurrEducation(event.target.value);
    };
    const handlePaseEducation = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setpastEducation(event.target.value);
    };
    
    return <div className="w-3/5 flex flex-col justify-center gap-2  bg-sky-950 p-3 rounded-md border border-cyan-300 ">
        <div className="flex justify-between gap-2">
            <div className="flex justify-center items-center flex-col w-full p-2 ">
                <InputBox label={"Username"} placeholder={"Enter Username"} onChange={(e)=>{
                    setusername(e.target.value)
                }}/>
                <InputBox label={"Email"} placeholder={"name@gmail.com"} onChange={(e)=>{
                    setemail(e.target.value)
                }}/>
                <InputBox label={"Password"} placeholder={"Enter Your Password"} type={"password"} onChange={(e)=>{
                    setpassword(e.target.value)
                }}/>
                <InputBox label={"Mobile No"} placeholder={"+91 987654321"} onChange={(e)=>{
                    setmobile(e.target.value)
                }}/>
            </div>
            <div className="flex justify-center  flex-col p-2 pl-5 ">
                <div className="flex justify-between p-2">
                    <div className="flex justify-start gap-2 items-center">
                        <label className="font-bold text-amber-700" htmlFor="country-selector">Affiliates</label>
                        <select
                            name="Affiliates"
                            id="affiliates-selector"
                            onChange={handleAffiliatesChange}
                            value={Affiliates || ''}
                            className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
                        >
                            <option value="">Affiliates</option>
                            <option value="freshers">Freshers</option>
                            <option value="alumni">Alumni</option>
                            {/* Add more options here if needed */}
                        </select>
                    </div>
                    <div className="flex gap-2 items-center">
                        <label className="font-bold text-amber-700" htmlFor="age-selector">Age</label>
                        <select
                            name="age"
                            id="age-selector"
                            onChange={handleAgeChange}
                            value={age || ''}
                            className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
                        > 
                            
                            <option value="">Age</option>
                            {
                                Age.map((x,ind)=>{
                                    return <option value={x} key={ind}>{x}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="flex justify-between p-2 gap-3">
                    <div className="flex gap-2 items-center">
                        <label className="font-bold text-amber-700" htmlFor="currEducation-selector">Present</label>
                        <select
                            name="currEducation"
                            id="currEducation-selector"
                            onChange={handleCurrEducation}
                            value={currEducation || ''}
                            className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
                        > 
                            
                            <option value="">Degrees</option>
                            <option value="Passed out">Passed Out</option>
                            {
                                degrees.map((x,ind)=>{
                                    return <option value={x} key={ind}>{x}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="flex gap-2 items-center ">
                        <label className="font-bold text-amber-700" htmlFor="pastEducation-selector">Past</label>
                        <select
                            name="pastEducation"
                            id="pastEducation-selector"
                            onChange={handlePaseEducation}
                            value={pastEducation || ''}
                            className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
                        >
                            
                            <option value="">Degrees</option>
                            {
                                degrees.map((x,ind)=>{
                                    return <option value={x} key={ind}>{x}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            
                <div className="flex justify-between p-2" >
                    <div className="flex justify-start gap-2 items-center">
                        <label className="font-bold text-amber-700" htmlFor="country-selector">Country</label>
                        <select
                            name="Country"
                            id="country-selector"
                            onChange={handleChange}
                            value={country || ''}
                            className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
                        >
                            <option value="">Country</option>
                            <option value="india">India</option>
                            {/* Add more options here if needed */}
                        </select>
                    </div>
                    <div className="flex gap-2 items-center">
                        <label className="font-bold text-amber-700" htmlFor="state-selector">State</label>
                        <select
                            name="State"
                            id="state-selector"
                            onChange={handleStateChange}
                            value={state || ''}
                            className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
                        >
                            
                            <option value="">State</option>
                            {
                                states.map((x,ind)=>{
                                    return <option value={x} key={ind}>{x}</option>
                                })
                            }
                        </select>
                    </div>

                </div>
                <InputBox label={"City"} placeholder={"Enter your city"} onChange={(e)=>{
                    setcity(e.target.value)
                }}/>
            </div>

        </div>
        <div className="p-2 pl-8 flex justify-start gap-3">
            <div 
                className={checked ? 
                `p-2 border border-yellow-600 bg-green-700 cursor-pointer w-5 h-5 rounded-sm` : 
                `p-2 border border-yellow-600 cursor-pointer w-5 h-5 rounded-sm bg-red-600`
                } 
                onClick={() => { setChecked(prev => !prev); }}
            ></div>
            <div className="font-extralight">
                By signing up, you agree to EduBridge&rsquo;s 
                <span 
                className="text-blue-600 underline font-bold cursor-pointer p-1" 
                onClick={() => { router.push("/privacypolicy"); }}
                >
                terms of service
                </span> 
                and 
                <span 
                className="text-blue-600 underline font-bold cursor-pointer p-1" 
                onClick={() => { router.push("/privacypolicy"); }}
                >
                privacy policy
                </span>.
            </div>
        </div>
        <div className="flex justify-start pl-7 gap-2 items-center cursor-pointer">
            <div className="w-7 h-7 text-red-700 rounded-full border border-teal-300 font-light text-center">i</div>
            <div className="text-zinc-600 underline font-semibold" onClick={()=>{router.push('/signin')}}>I alraedy have an account</div>
        </div>
        <div className="flex justify-center items-center p-2">
            
            <div className="flex justify-center items-center">
                <SecondaryButton onClick={async()=>{
                    if(checked){
                        try {
                            const res=await axios.post(`${apiUrl}/signup`,{
                                username:username,
                                email:email,
                                password:password,
                                mobile:mobile,
                                affiliates:Affiliates,
                                age:age,
                                currDegree:currEducation,
                                pastDegree:pastEducation,
                                country:country,
                                state:state,
                                city:city
                            });
                            setNotification({msg:res.data.msg,type:"success"})
                            router.push("/signin");
                        } catch (e:any) {
                            setNotification({msg:e.response?.data?.msg,type:"error"})
                        }
                        
                    }else{
                        setNotification({msg:"Before signing up you have to accept all terms and service.",type:"error"})
                    }
                }}>SignUp</SecondaryButton>
            </div>

        </div>
        
    </div>
}