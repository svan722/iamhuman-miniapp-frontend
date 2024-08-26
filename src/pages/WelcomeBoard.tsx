import { useState, useEffect, useContext } from "react";
import BoxIllustraionImg from "../assets/images/box_illustration.png";
import Shape from "../assets/images/shape.png";
import Button from "../components/button/Button";
import axios from "axios";
import { BASE_API } from "../config/config";
import { OtpContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setOtpVal } from "../actions/OtpAction";
import IDCheckModal from "../components/IDCheckModal";
// import { setLimitAcntVal } from "../actions/UserAction";
import { getTgUserId } from "../actions/TgUserAction";

export default function WelcomeBoard() {
  const navigate = useNavigate();
  const { username } = useContext(OtpContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const [osType, setOsType] = useState('');
  const tguserid = useAppSelector(getTgUserId);

  const hideModal = () => {
    setIsOpenModal(false);
  }

  const clickDownload = () => {
    if (osType == 'Android')
      window.open('https://play.google.com/store/apps/details?id=com.app.imhuman&hl=en');
    else if (osType == 'Mac')
      window.open('https://apps.apple.com/se/app/imhuman/id6482989056?l=en-GB');
  }

  useEffect(() => {
    let userAgent = navigator.userAgent || navigator.vendor;
    console.log('starting point', userAgent);
    if (userAgent.includes('Android', 0))
      setOsType('Android')
    else if (userAgent.includes('iPhone', 0) || userAgent.includes('Mac OS', 0))
      setOsType('Mac')
  }, []);

  async function getOTP() {
    console.log(username, "<<< tg user name");
    await axios
      .get(BASE_API + `getuserinotp/${username}`)
      .then((res) => {
        console.log(res.data, "get user in otp");
        if (res.data.code === 200) {
          console.log("get success OTP", res.data.user.otp);
          dispatch(setOtpVal(res.data.user.otp));
        } else if (res.data.code === 404) {
          console.log("Can't get OTP code");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getOTP();
    console.log(tguserid, '<<<<<<<<<<<<userid');
    if (username === 'imhuman1')
      return;
    axios
      .post(BASE_API + `getcurrentuser/${username}`, { username: username })
      .then((res) => {
        console.log("CURRENT USER", res);
        if (res.data.user) navigate("/hellohuman");
      });
  }, [username]);

  const linkApp = async () => {
    console.log("tg user name>>>", username);
    if (username === "imhuman1") {
      setIsOpenModal(true);
      return;
    }
    // getOTP();
    axios
      .post(BASE_API + `getcurrentuser/${username}`, { username: username })
      .then((res) => {
        console.log("CURRENT USER", res);
        if (res.data.user) navigate("/hellohuman");
        else if (res.data.code === 404) {
          axios
            .get(BASE_API + `getuserinotp/${username}`)
            .then(async (res) => {
              console.log("GET USER IN OTP >>>", res.data);
              if (res.data.user) {
                if (res.data.user.user_id) {
                  // setOtp(res.data.user.otp);
                  console.log(
                    "welcome remained time",
                    hexToInt(res.data.user.otp)
                  );
                  const timer = hexToInt(res.data.user.otp);
                  console.log("welcome Timer", timer);
                  if (timer > 0) {
                    navigate("/linkverify");
                  }
                  else {
                    await axios
                      .post(
                        BASE_API +
                          `get/tgbot/verification/link/${res.data.user.otp}`, {
                        user_id: username,
                        limit_acnt: 1
                  })
                      .then((res) => {
                        console.log("verification", res);
                        if (res.data.code === 200) {
                          navigate("/verifypassed");
                        } else {
                          navigate("/verifyfailed");
                        }
                      })
                      .catch(() => {
                        navigate("/verifyfailed");
                      });
                  }
                }
              } else {
                navigate("/linkverify");
              }
            })
            .catch((err) => {
              console.log("GET USER IN OTP ERR", err);
            });
        }
      });
  };

  function hexToInt(otpToken: any) {
    const timestampHex = otpToken.split("-")[1];
    const timestampInt = Number.parseInt(timestampHex, 16);
    const timer = timestampInt - Date.now();
    return timer;
  }

  return (
    <OtpContext.Provider value={{ username }}>
      <div
        className="p-4 w-full h-screen bg-[url('/assets/images/bg.png')] bg-no-repeat bg-center bg-cover absolute"
        style={{ fontFamily: "Inter" }}
      >
        <div className="relative flex flex-col justify-between p-4 rounded-lg bg-white border-[#D3D3D3] border h-full">
          <div>
            <h2 className="text-[40px] font-[600] leading-[48.41px]">
              Welcome to PrivaseaBot
            </h2>
            <p className="text-[16px] font-[400] leading-[22px]">
              Verify your human liveness, edit personal information, and verify
              your group members' liveness on Telegram.
            </p>
          </div>
          <div className="mb-[10px]">
            <div className="flex justify-center">
              <img
                className="mt-[10px] w-[176px]"
                src={BoxIllustraionImg}
                alt="Box"
              />
            </div>
            <div className="flex items-center justify-center">
              <p className="text-[14px] font-[400] leading-[22px]">
                Powered by
              </p>
              <img className="w-[12.35px] h-[15.17px]" src={Shape} />
              <p className="font-[noto] text-[8px] tracking-[0.2rem] text-[#162749] ml-1">
                PRIVASEA
              </p>
            </div>
          </div>
          <div className="py-3 px-5 border border-[#D3D3D3] rounded-lg">
            <p className="font-[600] text-[20px] leading-[24.2px] text-center">
              Set up with ImHuman App
            </p>
            <Button
              background={true}
              disabled={false}
              text="Link ImHuman APP"
              onClick={linkApp}
            />
            <div className="text-[16px] font-[500] leading-[22px] text-[#6486FF] mt-[20px] text-center" onClick={() => {clickDownload()}}>Download ImHuman App</div>
          </div>
        </div>
      </div>
      { isOpenModal && <IDCheckModal close={hideModal} />}
    </OtpContext.Provider>
  );
}
