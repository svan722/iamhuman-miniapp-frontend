import { useState, useEffect } from "react";
import CopyIcon from "../assets/images/ic_copy.svg";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from "../components/button/Button";
import { BASE_API } from "../config/config";
// import { OtpContext } from "./WelcomeBoard";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTelegram } from "../context/TelegramProvider";

interface LinkVerifyProps {
  close: () => void
}

export default function LinkVerify(props: LinkVerifyProps) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [time, setTime] = useState(900);
  const [username, setUsername] = useState<any>("imhuman1");

  const { user } = useTelegram(); 

  useEffect(() => {
    if(user !== undefined)
      setUsername(user?user.username:username);
  }, []);

  async function currentUser() {
    console.log(username, '>>>>>>>>> tg username');
    axios.post(BASE_API + `getcurrentuser/${username}`,{username:username})
      .then(res=> {
        console.log("CURRENT USER", res);
        if(res.data.user)  navigate("/hellohuman");
        else if(res.data.code === 404){
          axios.get(BASE_API + `getuserinotp/${username}`)
            .then(res=> {
              console.log("GET USER IN OTP >>>", res.data);
              if(res.data.user) {
                if(res.data.user.user_id)  {
                  setOtp(res.data.user.otp);
                }
              }
            })
            .catch(err=> {
              console.log("GET USER IN OTP ERR", err);
            })
        }
      })
  }

  async function getOTP() {
    await axios.get(BASE_API+`getotp/${user?user.username:username}`)
    .then(res => {
      if(res.data.code === 200) {
        setOtp(res.data.otp);
        // setOpenVerifyModal(true);
      }  else {
        console.log("You can't create OTP code");
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  // count down timer
  useEffect(() => {
    currentUser();

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

 const clipboardCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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

 const getResult = () => {

 }

  return (
    <div className={`w-full h-screen absolute bg-cover bg-white p-[35px]`} style={{fontFamily: "Inter"}}>
        <p className="font-[600] text-[20px] text-center pt-6 leading-[24.2px]">{`Verify your Human Likeness in the ImHuman App with this code`}</p>
        <p className="font-[400] text-[16px] px-[10px] leading-[22px] text-center pt-5">Paste your one-time passcode into your ImHuman <span className="font-[600]">TG Bot Link portal</span> by navigating to:</p>
        <p className="font-[600] text-[16px] text-center px-[45px] leading-[22px]">{"Proof > Liveness check > TG Bot Link"}</p>
        <div className="w-full h-[50px] rounded-[6px] bg-[#EAECF1] text-center p-[12px] mt-[20px] leading-[29.05px] text-[20px] font-[600] justify-center items-center flex">{otp}</div>
        <div className="text-center mt-[30px] text-[14px] font-[400] leading-[22px]">
            <span >The code is valid for </span><span className="text-red-500">{`${Math.floor(time / 60)}`.padStart(2, "0")}:{`${time % 60}`.padStart(2, "0")}</span>
        </div>
        <div className="flex justify-center mt-4">
            <CopyToClipboard text={String(otp)}>
            <div onClick={() => {clipboardCopy()}}>
                <span className="font-[700] text-[14px] leading-[22px] inline-block hover: cursor-pointer">{!isCopied?"Copy code":"Copied"}</span>
                <img className="ml-[10px] inline-block hover:cursor-pointer w-[24px] h-[24px]" src={CopyIcon} alt="ic_copy"/>
            </div>
            </CopyToClipboard>
        </div>
        <div className="py-2">
            <Button background={true} disabled={false} text="Retrieve verification result" onClick={()=>{getResult()}}/>
            <Button background={false} disabled={false} text="Cancel" onClick={handleCancel}/>
        </div> 
    </div>
  )
}
