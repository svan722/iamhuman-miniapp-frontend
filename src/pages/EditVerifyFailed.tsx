import { useEffect } from "react";
import VerifyFailedImg from "../assets/images/verify_failed.png";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../config/config";
// import { OtpContext } from "./WelcomeBoard";
import { useAppSelector } from "../app/hooks";
import { getOtpVal } from "../actions/OtpAction";

export default function EditVerifyFailed() {
  const navigate = useNavigate();
  // const [otp, setOtp] = useState("");
  // const otpContext = useContext(OtpContext);
  const otp = useAppSelector(getOtpVal);

  const genernateNewCode = async () => {
    await axios
      .delete(BASE_API + `edit/delete/opt/${otp}`)
      .then((res) => {
        console.log("handle cancel", res);
        navigate("/editlinkverify");
      })
      .catch((err) => {
        console.log("OTP delete failed", err);
      });
  };

  useEffect(() => {
    console.log("OTP redux >>>", otp);
  }, []);

  return (
    <div className="pt-[10px] " style={{ fontFamily: "Inter" }}>
      <div className="px-8">
        <div className="flex justify-center mt-[80px]">
          <img src={VerifyFailedImg} alt="verify success" />
        </div>
        <div className="text-center mt-[20px]">
          <p className="font-semibold text-2xl leading-[24.2px]">
            Verification failed
          </p>
          <p className="font-normal text-[14px] pt-3">
            Your code has expired. To link the ImHuman, you need to verify your
            Human Likeness using the new code
          </p>
        </div>
        <div className="absolute bottom-5 w-full right-0 px-8">
          <Button
            background={true}
            disabled={false}
            text={"Generate a new verification code"}
            onClick={genernateNewCode}
          />
          <Button
            background={false}
            disabled={false}
            text={"Cancel"}
            onClick={() => {
              navigate("/editprofile");
            }}
          />
        </div>
      </div>
    </div>
  );
}
