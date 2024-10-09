"use client";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";
import { SecondaryButton } from "./Buttons/SecondaryButton";
import { InputBox } from "./InputBox";
import { useState ,useEffect} from "react";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const ResetPassOtpModal = ({
    setForget,
    email,
    setEmail,
    otp,
    setOtp
}: {
    setForget: React.Dispatch<React.SetStateAction<boolean>>,
    email:string,
    setEmail:React.Dispatch<React.SetStateAction<string>>,
    otp:string,
    setOtp:React.Dispatch<React.SetStateAction<string>>
}) => {
    const setNotification = useSetRecoilState(notificationState);
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(60); // Start with 60 seconds
    const [isDisable,setIsDisable]=useState<boolean>(true);
    const [view, setView] = useState('A');
    const [toggle,setToggle]=useState<boolean>(false);
    const [password,setPassword]=useState("");
    const [confirmpassword,setConfirmPassword]=useState("");
    useEffect(() => {
        if(timeLeft == 0){
            setIsDisable(false);
        }
        if (timeLeft > 0) {
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timer); // Cleanup the timer on unmount or update
        }
    }, [timeLeft]);
  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setForget((prev) => !prev);
  };

  const handleClickInside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
  };
  const openLinkInNewTab = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <div
      id="popup-modal"
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full dark:bg-gray-700 dark:bg-opacity-25"
      onClick={handleClickOutside}
    >
      <div
        className="absolute top-36 p-3 xl:w-2/6 md:w-3/5 sm:w-4/5 xxs:w-full  "
        onClick={handleClickInside}
      >
        <div
          className="relative rounded-lg shadow  bg-gradient-to-tl from-black  to-slate-900  p-2 "
          onClick={handleClickInside}
        >
            <div className="flex items-center justify-between p-2 pb-0 rounded-t ">
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                    onClick={() => {
                       setForget(x=>!x)
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
                            strokeWidth={2}
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {view==='A'?(<div className="p-2 pt-0  flex mb-3 gap-3 justify-center items-end">
                    <InputBox label="Email" placeholder="name@gmail.com" onChange={(e)=>{setEmail(e.target.value)}}/>   
                    <SecondaryButton onClick={async()=>{
                        try {
                            if(email  && email.trim()){
                                const res=await axios.get(`${apiUrl}/otp/resend?email=${email}`);
                                if(res){
                                    setView('B');
                                    setNotification({msg:res.data.msg,type:'success'})
                                }
                            }else{
                                setNotification({msg:"Email is Required",type:'error'})
                            }
                            
                        } catch (error:any) {
                            if (error.response) {
                                setNotification({ msg: error.response.data.msg, type: 'error' });
                            } else {
                                // Handle cases where no response is received
                                setNotification({ msg: "An error occurred. Please try again later.", type: 'error' });
                            }
                        }
                        
                    }}>Send</SecondaryButton>
                </div>)
            :view === 'B' ?
                (<div className="p-2 pt-0 ">
                    <div className="flex justify-center gap-3 ">
                        <InputBox label={"OTP"} placeholder={"Enter OTP"} onChange={(e)=>{
                            setOtp(e.target.value);
                        }}/>
                        <div className="flex flex-col-reverse text-cyan-500 font-bold w-12">
                            <div className="border border-gray-600 rounded-md p-2 text-center">{timeLeft}s</div>
                        </div>
                    </div>
                    <div className="flex justify-between p-2">
                        <button data-modal-hide="popup-modal" type="button" className={`text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ${isDisable ? 'bg-red-800 cursor-not-allowed' : 'hover:bg-red-800'}`} disabled={isDisable}  onClick={async()=>{
                            
                            try {
                                if(email){
                                    const res=await axios.get(`${apiUrl}/otp/resend?email=${email}`);
                                    if(res){
                                        setTimeLeft(60);
                                        setIsDisable(true);
                                        setNotification({msg:res.data.msg,type:'success'})
                                    }
                                    
                                }else{
                                    setNotification({msg:"Email is Required",type:'error'})
                                }
                                
                            } catch (error:any) {
                                if (error.response) {
                                    setNotification({ msg: error.response.data.msg, type: 'error' });
                                } else {
                                    // Handle cases where no response is received
                                    setNotification({ msg: "An error occurred. Please try again later.", type: 'error' });
                                }
                            }
                        }}>
                            Resend
                        </button>
                        <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={async()=>{
                            try {
                                if(email && otp){
                                    const res=await axios.post(`${apiUrl}/otp`,{
                                        email,
                                        otp
                                    });
                                    if(res){
                                        setView('C');
                                        setNotification({msg:res.data.msg,type:'success'})
                                    }
                                    
                                }else{
                                    setNotification({msg:"Email or Otp is Required",type:'error'})
                                }
                                
                            } catch (error:any) {
                                if (error.response) {
                                    setNotification({ msg: error.response.data.msg, type: 'error' });
                                } else {
                                    // Handle cases where no response is received
                                    setNotification({ msg: "An error occurred. Please try again later.", type: 'error' });
                                }
                            }
                        }}>Verify</button>
                    </div>
                    
                </div>)
            : (
                <div className="p-2 pt-0  flex flex-col  gap-3 justify-center">
                    <InputBox label="new password" placeholder="Enter Your new password" onChange={(e)=>{setPassword(e.target.value)}} type={'password'}/>
                    <InputBox label="confirm password" placeholder="Enter Your confirm password" onChange={(e)=>{setConfirmPassword(e.target.value)}} type={'password'}/>
                   <div className="w-full flex justify-center items-center p-2">
                        <SecondaryButton onClick={async()=>{
                                try {
                                    if(email && password && confirmpassword){
                                        if(password===confirmpassword){
                                            const res=await axios.put(`${apiUrl}/updatedetail/password`,{
                                                email,
                                                password,
                                                otp
                                            })
                                            if(res){
                                                setForget(x=>!x);
                                                setNotification({msg:res.data.msg,type:'success'})
                                            }
                                            
                                        }else{
                                            setNotification({msg:"Passwords are not same",type:'error'})
                                        }
                                    }else{
                                        setNotification({msg:"Email and password is Required",type:'error'})
                                    }
                                    
                                } catch (error:any) {
                                    if (error.response) {
                                        setNotification({ msg: error.response.data.msg, type: 'error' });
                                    } else {
                                        // Handle cases where no response is received
                                        setNotification({ msg: "An error occurred. Please try again later.", type: 'error' });
                                    }
                                }
                                
                            }}>Reset</SecondaryButton>
                   </div>

                </div>
             )
            }
            
        </div>
      </div>
    </div>
  );
};
