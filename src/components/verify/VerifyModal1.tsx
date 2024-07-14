import closeSVG from "../../assets/images/bclose.svg";
import { useNavigate } from 'react-router-dom';
import Button from "../button/Button";

interface VerifyModal1Props {
  close?: () => void
}
export default function VerifyModal1(props: VerifyModal1Props) {
  const navigate = useNavigate();
  return (
    <>
    <div className="w-full h-full absolute bottom-[-230px] block rounded-lg bg-white border-[#D3D3D3] border z-10">

      <div className="px-8 py-5">
        <img className="float-end" src={closeSVG} alt="close" onClick={props.close}/>
        <p className="font-semibold text-[20px] text-center pt-8 leading-6">Verify your Human Likeness in ImHuman App with this code</p>
        <p className="font-normal text-base text-center pt-5">Paste your one-time passcode into your ImHuman Telegram Bot page by navigating to:</p>
        <p className="font-semibold text-base text-center leading-[22px]">{"Proof > Test your Liveness > TG Bot"}</p>
        <div className="grid grid-cols-4 gap-4 pt-4">
          <label className="w-[60px] h-[80px] rounded-lg bg-[#EAECF1] text-center text-2xl font-semibold py-5">7</label>
          <label className="w-[60px] h-[80px] rounded-lg bg-[#EAECF1] text-2xl font-semibold py-5 text-center">7</label>
          <label className="w-[60px] h-[80px] rounded-lg bg-[#EAECF1] text-2xl font-semibold py-5 text-center">7</label>
          <label className="w-[60px] h-[80px] rounded-lg bg-[#EAECF1] text-2xl font-semibold py-5 text-center">7</label>
        </div>
        <div className="text-center mt-4">
          <span >The code is valid for </span><span className="text-red-500">04:59</span>
        </div>
        <div className="py-2">
          <Button background={true} text="Copy code" onClick={()=>{navigate('/verifypassed')}}/>
          <Button background={false} text="Cancel"/>
        </div> 
      </div>
    </div>
    </>
  )
}
