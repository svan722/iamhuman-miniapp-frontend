import { useEffect, useContext } from "react";
import BoxIllustraionImg from "../assets/images/box_illustration.png";
import Shape from "../assets/images/shape.png";
import Button from "../components/button/Button";
import axios from "axios";
import { BASE_API } from "../config/config";
import { OtpContext } from "../App";
// import { useTelegram } from "../context/TelegramProvider";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setOtpVal } from "../actions/OtpAction";

export default function WelcomeBoard() {
  // const [isVisible, setIsvisible] = useState(true);
  // const [username, setUsername] = useState<string>("imhuman1");
  // const [otp, setOtp] = useState("00000000");

  const navigate = useNavigate();
  // const { user } = useTelegram();
  const { username } = useContext(OtpContext);
  const dispatch = useAppDispatch();

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
  }, []);

  // useEffect(() => {
  //   if( isVisible && otp !== "00000000") {
  //     // setOpenVerifyModal(false);
  //   }
  // }, [isVisible]);

  const linkApp = async () => {
    console.log("tg user name>>>", username);
    // getOTP();
    // alert(username);
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
                  if (timer > 0) navigate("/linkverify");
                  else if (timer < 0) {
                    await axios
                      .post(
                        BASE_API +
                          `get/tgbot/verification/link/${res.data.user.otp}`,
                        username
                      )
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
          </div>
        </div>
      </div>
    </OtpContext.Provider>
  );
}
