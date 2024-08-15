import VerifyNotCompleteImg from "../assets/images/verify_not_completed.png";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";

export default function EditVerifyNotCompleted() {
  const navigate = useNavigate();
  return (
    <div className="pt-[10px] " style={{ fontFamily: "Inter" }}>
      <div className="px-8">
        <div className="flex justify-center mt-[80px]">
          <img src={VerifyNotCompleteImg} alt="verify success" />
        </div>
        <div className="text-center mt-[20px]">
          <p className="font-semibold text-2xl leading-[24.2px]">
            Verification not completed
          </p>
          <p className="font-normal text-[14px] pt-3">
            Please try to verify again before your code expires
          </p>
        </div>
        <div className="absolute bottom-5 w-full right-0 px-8">
          <Button
            background={true}
            disabled={false}
            text={"View my verification code"}
            onClick={() => {
              navigate("/editlinkverifyback");
            }}
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
