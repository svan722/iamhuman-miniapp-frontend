import { useNavigate } from "react-router-dom";
import UpgradeLogo from "../assets/images/account_upgrade.png";
import Button from "../components/button/Button";

export default function AccountUpgraded() {
  const navigate = useNavigate();
  return (
    <div className="pt-[10px] " style={{fontFamily: "Inter"}}>
      <div className="flex justify-center">
        <img src={UpgradeLogo}/>
      </div>
      <p className="font-semibold text-xl text-center ">Account upgraded!</p>
      <p className="text-center mt-7">Congratuations! Now you have full<br/> access to Privasea Premium features. </p>
      <div className='absolute bottom-5 w-full right-0 px-8'>
          <Button background={true} disabled={false} text={"Start using my Proof"} onClick={()=> {navigate("/select_verification")}}/>
        </div>
    </div>
  )
}
