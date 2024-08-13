import {useState, useEffect } from "react";
import closeSVG from "../../assets/images/bclose.svg";
import Button from "../button/Button";
// import { OtpContext } from "../../pages/EditProfile";
import {CopyToClipboard} from "react-copy-to-clipboard";

interface VerifyModal1Props {
  close: () => void
}
export default function VerifyModal1(props: VerifyModal1Props) {
  const [time, setTime] = useState(900);
  const [timeExpire, setTimeExpire] = useState(false);
  const [otp, setOtp] = useState<string>("");
  // const context = useContext(OtpContext);

  useEffect(() => {
    if (time === 0) {
        console.log("close");
        setTimeExpire(true);
      }
    }, [time]);

  // count down timer
  useEffect(() => {
    // console.log("context otp", context);
    // const otpToken = context.split("-")[0] + "-" + context.split("-")[1];
    // setOtp(otpToken);

    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          setOtp("");
          clearInterval(timer);
          props.close();
          return 0;
        } else return time - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // const clipboardCopy = async (text: string) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     // setIsCopied(true);
  //     console.log('Text copied to clipboard:', text);
  //   } catch (err) {
  //     console.error('Failed to copy text: ', err);
  //   }
  //  }

  return (
    <div className="w-full h-full absolute bottom-[-230px] block rounded-lg bg-white border-[#D3D3D3] border z-10">
      <div className="px-8 py-5">
        <img className="float-end" src={closeSVG} alt="close" onClick={props.close}/>
        <p className="font-semibold text-[20px] text-center pt-8 leading-6">Verify your Human Likeness in ImHuman App with this code</p>
        <p className="font-normal text-base text-center pt-5">Paste your one-time passcode into your ImHuman Telegram Bot page by navigating to:</p>
        <p className="font-semibold text-base text-center leading-[22px]">{"Proof > Test your Liveness > TG Bot"}</p>
        <div className="w-full h-[50px] rounded-[6px] bg-[#EAECF1] text-center p-[12px] mt-[20px] leading-[29.05px] text-[20px] font-[600] justify-center items-center flex">{otp}</div>
        <div className="text-center mt-4">
          {!timeExpire && 
            <>
              <span >The code is valid for </span><span className="text-red-500">{`${Math.floor(time / 60)}`.padStart(2, "0")}:{`${time % 60}`.padStart(2, "0")}</span>
            </>
          }
          {
            timeExpire &&
            <span>Try again</span>
          }
        </div>
        <div className="py-2">
          <CopyToClipboard text={String(otp)}>
            <Button background={true} disabled={false} text="Copy code"/>
          </CopyToClipboard>
          <Button background={false} disabled={false} text="Cancel" onClick={props.close}/>
        </div> 
      </div>
    </div>
  )
}
