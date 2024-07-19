import { useState, useEffect, useContext } from "react";
import closeSVG from "../../assets/images/bclose.svg";
import CopyIcon from "../../assets/images/ic_copy.svg";
import { useNavigate } from 'react-router-dom';
import Button from "../button/Button";
import { OtpContext } from "../../pages/WelcomeBoard";

interface VerifyModalProps {
  close?: () => void
}

export default function VerifyModal(props: VerifyModalProps) {
  const navigate = useNavigate();
  const [nft, setNFT] = useState<number>(0);
  const [otp, setOtp] = useState<string>("");
  // const [copiedText, setCopiedText] = useState('');

  const context = useContext(OtpContext);

  useEffect(() => {
      setOtp(context);

      // Set up the interval
      const id = setInterval(() => {
      setNFT((prevCount) => prevCount + 1);
    }, 1000);
    
    if (nft >= 500) {
      clearInterval(id);
      navigate("/verifysuccess");
    }
    return () => {
      // Clear the interval when the component unmounts
        clearInterval(id);
    };
  }, [setNFT]);

  useEffect(() => {
     if (nft >= 500) {
      console.log("close");
      navigate("/verifysuccess");
    }
 }, [nft]);

 const clipboardCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // setCopiedText(text);
    console.log('Text copied to clipboard:', text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
 }
  return (
    <>
    <div className="w-full h-full absolute bottom-[-80px] block rounded-lg bg-white border-[#D3D3D3] border">

      <div className="px-8 py-5">
        <img className="float-end" src={closeSVG} alt="close" onClick={props.close}/>
        <p className="font-semibold text-[20px] text-center pt-6 leading-6">{`Verify your Human Likeness in ImHuman App with this code`}</p>
        <p className="font-normal text-base text-center pt-5">Paste your one-time passcode into your ImHuman Telegram Bot page by navigating to:</p>
        <p className="font-semibold text-base text-center leading-[22px]">{"Proof > Test your Liveness > TG Bot"}</p>
        <div className="grid grid-cols-4 gap-4 pt-4">
          {
            String(otp).split('').map((i:any,index:number)=>(
              <label className="w-[50px] h-[70px] rounded-lg bg-[#EAECF1] text-center text-2xl font-semibold py-5" key={index}>{i}</label>
            )) 
          }
        
        </div>
        <div className="text-center mt-4">
          <span >The code is valid for </span><span className="text-red-500">04:59</span>
        </div>
        <div className="flex justify-center mt-4">
          <div onClick={()=>clipboardCopy(String(otp))}>
            <span className="font-bold text-[14px] leading-[22px] inline-block hover: cursor-pointer">Copy code</span>
            <img className="ml-2 inline-block hover: cursor-pointer" src={CopyIcon} alt="ic_copy"/>
          </div>
        </div>
        <div className="py-2">
          <Button background={true} text="Copy code" onClick={()=>{navigate('/verifysuccess')}}/>
          <Button background={false} text="Cancel" onClick={props.close}/>
        </div> 
      </div>
    </div>
    </>
  )
}
