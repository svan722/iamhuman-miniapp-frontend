import { useState, useEffect, useContext } from "react";
import CopyIcon from "../assets/images/ic_copy.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/button/Button";
import { BASE_API } from "../config/config";
import { OtpContext } from "../App";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function EditLinkVerifyBack() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [time, setTime] = useState(NaN);

  const { username } = useContext(OtpContext);

  async function currentUser() {
    console.log("context username", username);
    // axios
    //   .post(BASE_API + `getcurrentuser/${username}`, { username: username })
    //   .then((res) => {
    //     console.log("CURRENT USER", res);
    //     if (res.data.user) navigate("/hellohuman");
    //     else if (res.data.code === 404) {
    axios
      .get(BASE_API + `edit/getuserinotp/${username}`)
      .then((res) => {
        console.log("GET USER IN OTP >>>", res.data);
        if (res.data.user) {
          if (res.data.user.user_id) {
            setOtp(res.data.user.otp);
            hexToInt(res.data.user.otp);
          }
        } else {
          createOtp();
        }
      })
      .catch((err) => {
        console.log("GET USER IN OTP ERR", err);
      });
    //   }
    // });
  }

  async function createOtp() {
    await axios
      .get(BASE_API + `edit/getotp/${username}`)
      .then((res) => {
        console.log(res.data, "<<<create otp");
        // if(ret.data._otp)  setOtp(ret.data._otp.otp);
        if (res.data) setOtp(res.data.otp);
        hexToInt(res.data.otp);
      })
      .catch((error) => {
        console.log(error);
      });
    // return otp;
  }

  function hexToInt(otpToken: any) {
    const timestampHex = otpToken.split("-")[1];
    const timestampInt = Number.parseInt(timestampHex, 16);
    const timer = timestampInt - Date.now();
    if (timer < 0) setTime(0);
    else setTime(Math.floor(timer / 1000));
    return Math.floor(timer / 1000);
  }

  // count down timer
  useEffect(() => {
    currentUser();
  }, []);

  useEffect(() => {
    if (NaN) return;
    let timer = setTimeout(() => {
      if (time === 0) {
        clearTimeout(timer);
        return 0;
      } else {
        setTime(time - 1);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  const clipboardCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCancel = async () => {
    navigate("/editprofile");
  };

  const getResult = async () => {
    await axios
      .post(BASE_API + `edit/get/tgbot/verification/edit/${otp}`, {
        user_id: username,
      })
      .then((res) => {
        console.log("verification", res);
        if (res.data.msg === "ok" && res.data.code === 200) {
          navigate("/verifysuccess");
        } else {
          navigate("/editverifynotcompleted");
        }
      });
  };

  return (
    <div
      className={`w-full h-screen absolute bg-cover bg-white p-[35px]`}
      style={{ fontFamily: "Inter" }}
    >
      <p className="font-[600] text-[20px] text-center pt-6 leading-[24.2px]">{`Welcome Back!`}</p>
      <p className="font-[400] text-[16px] px-[10px] leading-[22px] text-center pt-5">
        If you haven't verified yourself yet, you can still use the code to
        complete verification. If you've already done so, click the button below
        to{" "}
        <span className="font-[600]">retrieve your verification result.</span>
      </p>
      <p className="font-[400] text-[16px] px-[10px] leading-[22px] text-center pt-5">
        Paste your one-time passcode into your ImHuman{" "}
        <span className="font-[600]">TG Bot Link portal</span> by navigating to:
      </p>
      <p className="font-[600] text-[16px] text-center px-[45px] leading-[22px]">
        {"Proof > Liveness check > TG Bot Link"}
      </p>
      <div className="w-full h-[50px] rounded-[6px] bg-[#EAECF1] text-center p-[12px] mt-[20px] leading-[29.05px] text-[20px] font-[600] justify-center items-center flex">
        {otp}
      </div>
      <div className="text-center mt-[30px] text-[14px] font-[400] leading-[22px]">
        <span>The code is valid for </span>
        <span className="text-red-500">
          {isNaN(time)
            ? "Loading time..."
            : `${`${Math.floor(time / 60)}`.padStart(2, "0")}:${`${
                time % 60
              }`.padStart(2, "0")}`}
        </span>
      </div>
      <div className="flex justify-center mt-4">
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
      <div className="py-2">
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
  );
}
