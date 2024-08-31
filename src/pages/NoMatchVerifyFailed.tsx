import { useEffect, useContext } from "react";
import VerifyFailedImg from "../assets/images/verify_failed.png";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../config/config";
import { OtpContext } from "../App";
import { useAppSelector } from "../app/hooks";
import { getOtpVal } from "../actions/OtpAction";

export default function NoMatchVerifyFailed() {
  const navigate = useNavigate();
  // const [otp, setOtp] = useState("");
  // const otpContext = useContext(OtpContext);
  const otp = useAppSelector(getOtpVal);
  const { username } = useContext(OtpContext);

  const genernateNewCode = async () => {
    console.log(username, '<<<<<<<<<username for delete')
    await axios
      .delete(BASE_API + `edit/delete/opt/${username}`)
      .then((res) => {
        console.log("handle cancel", res);
        navigate("/profileverify");
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
        <div className="text-center mt-[10px]">
          <p className="font-[600] text-[20px] leading-[24.2px]">
            Verification failed
          </p>
          <p className="font-[400] text-[16px] leading-[19.36px] pt-3 px-[5px]">
          The ImHuman account you are using to verify doesn’t match your linked ImHuman account. Please generate a new code and try again.
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
              navigate("/hellohuman");
            }}
          />
        </div>
      </div>
    </div>
  );
}
