import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import LinkImg from "../assets/images/link.png";
import CopyIcon from "../assets/images/ic_copy.svg";
import Footer from "../components/footer/Footer";
// import { useTelegram } from "../context/TelegramProvider";
import { OtpContext } from "../App";
import { useNavigate } from "react-router-dom";
import { BASE_API } from "../config/config";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "../components/button/Button";
import { useAppSelector } from "../app/hooks";
import { getEditVal } from "../actions/EditAction";
import { useAppDispatch } from "../app/hooks";
import { setOtpVal } from "../actions/OtpAction";
// import { validateDiscordUsername } from "../utils/validate";

interface IUpdateUserData {
  xlink?: String;
  discordUsername?: String;
  personalWeb?: String;
}
export const UpdateUserDataContext = createContext<IUpdateUserData>({});

export default function ProfileVerify() {
  // const { user } = useTelegram();
  const navigate = useNavigate();
  const { username } = useContext(OtpContext);
  // const [bio, setBio] = useState("");
  // const [xlink, setXlink] = useState("");
  // const [discordUsername, setDiscordUsername] = useState("");
  // const [personal, setPersonal] = useState("");
  const [time, setTime] = useState(NaN);
  const [updateUserData] = useState({});
  const [editOtp, setEditOtp] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  const dispatch = useAppDispatch();
  const editData = useAppSelector(getEditVal);

  useEffect(() => {
    axios
      .get(BASE_API + `edit/getuserinotp/${username}`)
      .then((res) => {
        console.log("GET USER IN OTP >>>", res.data);
        if (res.data.user) {
          if (res.data.user.user_id) {
            setEditOtp(res.data.user.otp);
            hexToInt(res.data.user.otp);
          }
        } else {
          createOtp();
        }
      })
      .catch((err) => {
        console.log("GET USER IN OTP ERR", err);
      });
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

  async function createOtp() {
    await axios
      .get(BASE_API + `edit/getotp/${username}`)
      .then((res) => {
        console.log(res.data, "<<<create otp");
        if (res.data) {
          setEditOtp(res.data.otp.otp);
          dispatch(setOtpVal(res.data.otp.otp));
        }
        hexToInt(res.data.otp.otp);
      })
      .catch((error) => {
        console.log(error);
      });
    // return otp;
  }

  function hexToInt(otpToken: any) {
    const timestampHex = otpToken.split("-")[1];
    const timestampInt = Number.parseInt(timestampHex, 16);
    const timer = Math.floor(timestampInt - Date.now() / 1000) > 900 ? 900 : Math.floor(timestampInt - Date.now() / 1000);
    if (timer < 0) setTime(0);
    else setTime(Math.floor(timer));
    return Math.floor(timer);
  }

  const linkSocial = (linkVal: any) => {
    window.open(linkVal);
  };
  const clipboardCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  const handleCancel = async () => {
    navigate("/hellohuman");
  };

  const getResult = async () => {
    const userData = {
      user_id: username,
      bio: editData.bio,
      x_link: editData.x_link,
      discordUsername: editData.discordUsername,
      personal_website: editData.personal_website,
    };

    console.log("User Edit data >>>", userData);

    await axios
      .post(BASE_API + `edit/get/tgbot/verification/edit/${editOtp}`, userData)
      .then((res) => {
        console.log("verification", res);
        // alert(res.data.code);
        if (res.data.code === 200) {
          navigate("/verifypassed");
        } else {
          if (time > 0) {
            if (res.data.code === 402) {
              navigate("/nomatchverifynotcompleted")
            } else {
              navigate("/editverifynotcompleted");
            }
          }
          else {
            if (res.data.code === 402) {
              navigate("/nomatchverifyfailed")
            } else {
              navigate("/editverifyfailed");
            }
          }
        }
      });
  };

  return (
    <UpdateUserDataContext.Provider value={updateUserData}>
      <div className="pt-[20px] " style={{ fontFamily: "Inter" }}>
        <div className="-z-20">
          <div className="px-4 pb-[115px] bg-white">
            <h1 className="font-[600] text-[20px] leading-[24.2px] text-center mb-[20px] px-[15px]">
              Verify your Human Likeness in the ImHuman App to save profile
              edits
            </h1>
            <div className="rounded-[8px] bg-[#F5F5F5] p-[16px]">
              <h1 className="font-[500] text-[16px] leading-[19.36px] mb-[10px]">
                Pending edits
              </h1>
              <div className="mb-[20px]">
                <h1 className="font-[500] text-[14px] leading-[16.94px] mb-[10px]">
                  Personal bio
                </h1>
                <div className="text-[12px] font-[400] leading-[14.52px]">
                  {editData.bio}
                </div>
              </div>
              <div className="mb-[20px]">
                <h1 className="font-[500] text-[14px] leading-[16.94px] mb-[5px]">
                  X link
                </h1>
                <div
                  className="flex items-center"
                  onClick={() => {
                    linkSocial(editData.x_link);
                  }}
                >
                  <img
                    src={LinkImg}
                    className="w-[16px] h-[16px]"
                    alt="xlink"
                  />
                  <div className="text-[12px] font-[400] leading-[14.52px]">
                    {editData.x_link}
                  </div>
                </div>
              </div>
              <div className="mb-[20px]">
                <h1 className="font-[500] text-[14px] leading-[16.94px] mb-[5px]">
                  Discord username
                </h1>
                <div className="text-[12px] font-[400] leading-[14.52px]">
                  {editData.discordUsername}
                </div>
              </div>
              <div className="">
                <h1 className="font-[500] text-[14px] leading-[16.94px] mb-[5px]">
                  Personal website link
                </h1>
                <div
                  className="flex items-center"
                  onClick={() => {
                    linkSocial(editData.personal_website);
                  }}
                >
                  <img
                    src={LinkImg}
                    className="w-[16px] h-[16px]"
                    alt="websitelink"
                  />
                  <div className="text-[12px] font-[400] leading-[14.52px]">
                    {editData.personal_website}
                  </div>
                </div>
              </div>
            </div>
            <div className="my-[20px]">
              <div className="text-[16px] leading-[22px] text-center font-[400] px-[30px]">
                Paste your one-time passcode into your ImHuman{" "}
                <span>TG Bot Edit portal</span> by navigating to:
              </div>
              <div className="text-[16px] leading-[22px] text-center font-[600] px-[70px]">
                {"Proof > Liveness check > TG Bot Edit"}
              </div>
            </div>
            <div className="text-[20px] leading-[24.2px] rounded-[8px] bg-[#F5F5F5] px-[8px] py-[16px] text-center font-[600] my-[20px]">
              {editOtp}
            </div>
            <div className="font-[400] leading-[22px] text-center text-[14px]">
              The code is valid for{" "}
              <span className="text-[#FF0000]">
                {isNaN(time)
                  ? "Loading time..."
                  : `${`${Math.floor(time / 60)}`.padStart(2, "0")}:${`${
                      time % 60
                    }`.padStart(2, "0")}`}
              </span>
            </div>
            <div className="flex justify-center my-[20px]">
              <CopyToClipboard text={String(editOtp)}>
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
          <Footer />
        </div>
      </div>
    </UpdateUserDataContext.Provider>
  );
}
