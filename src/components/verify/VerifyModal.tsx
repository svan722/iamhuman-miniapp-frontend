import { useState, useEffect, useContext } from "react";
import closeSVG from "../../assets/images/bclose.svg";
import CopyIcon from "../../assets/images/ic_copy.svg";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from "../button/Button";
import { BASE_API } from "../../config/config";
import { OtpContext } from "../../pages/WelcomeBoard";

interface VerifyModalProps {
  close: () => void
}

export default function VerifyModal(props: VerifyModalProps) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [time, setTime] = useState(900);

  const context = useContext(OtpContext);

  // count down timer
  useEffect(() => {
    const otpToken = context.split("-")[0] + "-" + context.split("-")[1];
    setOtp(otpToken);
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          setOtp("");
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

 const clipboardCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    console.log('Text copied to clipboard:', text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
 
 }

 const handleCancel = async () => {
  await axios.delete(BASE_API + `delete/opt/${otp}`)
    .then((res) => {
      console.log("handle cancel", res)
      props.close()
    }).catch(err=> {
      console.log("OTP delete failed", err)
    })
 }

  return (
    <div className={`w-full h-full absolute bottom-[-14px] block rounded-lg bg-white border-[#D3D3D3] border modal-anim-slideIn`} style={{fontFamily: "Inter"}}>
      <div className="px-8 py-5">
        <img className="float-end" src={closeSVG} alt="close" onClick={props.close}/>
        <p className="font-[600] text-[20px] text-center pt-6 leading-[24.2px]">{`Verify your Human Likeness in ImHuman App with this code`}</p>
        <p className="font-[400] text-[16px] px-[10px] leading-[22px] text-center pt-5">Paste your one-time passcode into your ImHuman Telegram Bot page by navigating to:</p>
        <p className="font-[600] text-[16px] text-center px-[40px] leading-[22px]">{"Proof > Test your Liveness > TG Bot Link Portal"}</p>
        <div className="w-full h-[50px] rounded-[6px] bg-[#EAECF1] text-center p-[12px] mt-[20px] leading-[29.05px] text-[20px] font-[600] justify-center items-center flex">{otp}</div>
        <div className="text-center mt-[30px] text-[14px] font-[400] leading-[22px]">
          <span >The code is valid for </span><span className="text-red-500">{`${Math.floor(time / 60)}`.padStart(2, "0")}:{`${time % 60}`.padStart(2, "0")}</span>
        </div>
        <div className="flex justify-center mt-4">
          <div onClick={()=>clipboardCopy(String(otp))}>
            <span className="font-[700] text-[14px] leading-[22px] inline-block hover: cursor-pointer">{!isCopied?"Copy code":"Copied"}</span>
            <img className="ml-[10px] inline-block hover:cursor-pointer w-[24px] h-[24px]" src={CopyIcon} alt="ic_copy"/>
          </div>
        </div>
        <div className="py-2">
          <Button background={true} disabled={false} text="Download ImHuman" onClick={()=>{navigate('/verifysuccess')}}/>
          <Button background={false} disabled={false} text="Cancel" onClick={handleCancel}/>
        </div> 
      </div>
    </div>
  )
}
