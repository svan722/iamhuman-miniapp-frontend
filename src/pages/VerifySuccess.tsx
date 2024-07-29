import VerifySuccessImg from "../assets/images/verify_success.png";
import Button from '../components/button/Button';
import { useNavigate } from 'react-router-dom';

export default function VerifySuccess() {
  const navigate = useNavigate();
  return (
    <div className="pt-[10px] " style={{fontFamily: "Inter"}}>
      <div className='px-8'>
        <div className='flex justify-center'>
          <img className="w-[254.38px]" src={VerifySuccessImg} alt="verify success" />
        </div>
        <div className='text-center mt-[10px] mb-[30px]'>
          <p className='font-[600] leading-[24.2px] text-[20px]'>Verification passed!<br/> Linking successful</p>
          <p className='font-[400] text-[16px] leading-[19.36px] pt-3'>Your ImHuman App is now linked to your Telegram account. You can prove your TG account ownership and allow your group members to verify human likeness.</p>
        </div>
        <div>
          <Button background={true} disabled={false} text={"Done!"} onClick={()=> {navigate("/hellohuman")}}/>
          <Button background={false} disabled={false} text={"Edit personal information"} onClick={()=>navigate("/editprofile")}/>
        </div>
      </div>  
    </div>
  )
}
