import { useState, useEffect } from "react";
import Button from "./button/Button";
// import axios from "axios";
// import { BASE_API } from "../../config/config";
// import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "../assets/images/ic_copy.svg";
import CancelImg from "../assets/images/Vector.png";

interface GroupVerifyModalProps {
  clickShare: () => void
  clickClose: () => void
  proofTime: string
}

export default function GroupVerifyModal(props: GroupVerifyModalProps) {
  // const  navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const clipboardCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    setOtp("");
    return () => { };
  }, []);

  return (
    <div className={`w-full h-[90%] p-[30px] absolute bottom-[0%] block rounded-lg bg-white border-[#D3D3D3] border modal-anim-slideIn`} style={{fontFamily: "Inter"}}>
      <div className="flex justify-end">
        <img className="w-[16px] h-[16px] mb-[10px] cursor-pointer" src={CancelImg} alt="close" onClick={props.clickClose}/>
      </div>
      <div className="flex flex-col items-center p-[10px]">
        <div className="text-[20px] font-[600] text-center leading-[24.2px] mb-[10px]">Group verification request</div>
        <div className="text-[16px] font-[400] leading-[22px] text-center">Share this code with the user for Human Likeness Verification. The user can enter the code in their ImHuman App by going to:</div>
        <div className="text-[16px] font-[600] leading-[22px] text-center px-[30px]">{"Proof > Test your Liveness > TG Bot Group Verification"}</div>
        <div className="text-[14px] font-[400] leading-[22px] text-center text-[#FF0000]">{" Note: The code only works for this group"}</div>
      </div>
      <div className="w-full h-[50px] rounded-[6px] bg-[#EAECF1] text-center p-[12px] mt-[20px] leading-[29.05px] text-[20px] font-[600] justify-center items-center flex">
        {otp}
      </div>
      <div className="text-[14px] font-[400] leading-[22px] text-center text-[#FF0000] mt-[15px]">{"The code is valid for "}{props.proofTime}<span className="text-red">{" days"}</span></div>
      <div className="flex justify-center mt-[10px]">
        <CopyToClipboard text={String(otp)}>
          <div
            onClick={() => {
              clipboardCopy();
            }}
          >
            <span className="font-[700] text-[14px] leading-[22px] inline-block hover: cursor-pointer">
              {!isCopied ? "Copy code" : "Copied"}
            </span>
            <img
              className="ml-[10px] inline-block hover:cursor-pointer w-[24px] h-[24px]"
              src={CopyIcon}
              alt="ic_copy"
            />
          </div>
        </CopyToClipboard>
      </div>
      <div>
        <Button background={true} disabled={false} text="Share" onClick={props.clickShare} />
        <Button background={false} disabled={false} text="Cancel" onClick={props.clickClose} />
      </div>
    </div>
  )
}
