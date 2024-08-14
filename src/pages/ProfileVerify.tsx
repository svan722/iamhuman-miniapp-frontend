import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import LinkImg from "../assets/images/link.png";
import CopyIcon from "../assets/images/ic_copy.svg";
import Footer from "../components/footer/Footer";
// import { useTelegram } from "../context/TelegramProvider";
import { OtpContext } from "../App";
import { useNavigate } from 'react-router-dom';
import { BASE_API } from "../config/config";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "../components/button/Button";

interface IUpdateUserData {
  xlink?: String,
  discordUsername?: String,
  personalWeb?: String
}
export const UpdateUserDataContext = createContext<IUpdateUserData>({});

export default function ProfileVerify() {
  // const { user } = useTelegram();
  const navigate = useNavigate();
  const { username } = useContext(OtpContext);
  const [bio, setBio] = useState("");
  const [xlink, setXlink] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [personal, setPersonal] = useState("")
  const [updateUserData]  = useState({});
  const [isCopied, setIsCopied] = useState(false);

  const linkSocial = (linkVal:any) => {
    window.open(linkVal);
  }
  const clipboardCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  const handleCancel = async () => {
    navigate("/");
  };

  const getResult = async () => {
  };


  return (
    <UpdateUserDataContext.Provider value={updateUserData}>
      <div className="pt-[20px] " style={{fontFamily: "Inter"}}>
        <div className="-z-20">
          <div className="px-4 pb-[115px] bg-white">
            <h1 className="font-[600] text-[20px] leading-[24.2px] text-center mb-[20px] px-[15px]">Verify your Human Likeness in the ImHuman App to save profile edits</h1>
            <div className="rounded-[8px] bg-[#F5F5F5] p-[16px]">
              <h1 className="font-[500] text-[16px] leading-[19.36px] mb-[10px]">Pending edits</h1>
              <div className="mb-[20px]">
                <h1 className="font-[500] text-[14px] leading-[16.94px] mb-[10px]">Personal bio</h1>
                <div className="text-[12px] font-[400] leading-[14.52px]">The WorkHeart NFT ensures that nodes are live and maintained by humans, providing seamless FHE AI services. Currently, the WorkHeart Combo is available for reservation with a fee of 0.015 ETH, applied towards the total payment.</div>
              </div>
              <div className="mb-[20px]">
                <h1 className="font-[500] text-[14px] leading-[16.94px] mb-[5px]">X link</h1>
                <div className="flex items-center" onClick={() => {linkSocial('https://x.com/yunan_minami')}}>
                  <img src={LinkImg} className="w-[16px] h-[16px]" alt="xlink" />
                  <div className="text-[12px] font-[400] leading-[14.52px]">https://x.com/yunan_minami</div>
                </div>
              </div>
              <div className="mb-[20px]">
                <h1 className="font-[500] text-[14px] leading-[16.94px] mb-[5px]">Discord username</h1>
                <div className="text-[12px] font-[400] leading-[14.52px]">@102020</div>
              </div>
              <div className="">
                <h1 className="font-[500] text-[14px] leading-[16.94px] mb-[5px]">Personal website link</h1>
                <div className="flex items-center" onClick={() => {linkSocial('www.privasea.ai')}}>
                  <img src={LinkImg} className="w-[16px] h-[16px]" alt="websitelink" />
                  <div className="text-[12px] font-[400] leading-[14.52px]">www.privasea.ai</div>
                </div>
              </div>
            </div>
            <div className="my-[20px]">
              <div className="text-[16px] leading-[22px] text-center font-[400] px-[30px]">Paste your one-time passcode into your ImHuman{" "} <span>TG Bot Edit portal</span>  by navigating to:</div>
              <div className="text-[16px] leading-[22px] text-center font-[600] px-[70px]">{"Proof > Liveness check > TG Bot Link"}</div>
            </div>
            <div className="text-[20px] leading-[24.2px] rounded-[8px] bg-[#F5F5F5] px-[8px] py-[16px] text-center font-[600] my-[20px]">ABCDEFT-642F5C00</div>
            <div className="font-[400] leading-[22px] text-center text-[14px]">The code is valid for{" "}<span className="text-[#FF0000]">14:59</span></div>
            <div className="flex justify-center my-[20px]">
              <CopyToClipboard text={String('aaaaaaaaaaaaaaaa')}>
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
            <div className="pb-2">
              <Button
                background={true}
                disabled={false}
                text="Retrieve verification result"
                onClick={() => {
                  getResult();
                }}
              />
              <Button
                background={false}
                disabled={false}
                text="Cancel"
                onClick={handleCancel}
              />
            </div>

          </div>
        </div>
        <div className="fixed bottom-0 w-full z-10">
          <Footer/>
        </div>
      </div>
    </UpdateUserDataContext.Provider>
  )
}
