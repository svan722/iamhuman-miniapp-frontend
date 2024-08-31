import VerifyFailedImg from "../assets/images/verify_failed.png";
import Button from '../components/button/Button';
import { useNavigate } from 'react-router-dom';

export default function NoMatchVerifyNotCompleted() {
  const navigate = useNavigate();
  return (
    <div className="pt-[10px] " style={{fontFamily: "Inter"}}>
      <div className='px-8'>
        <div className='flex justify-center mt-[80px]'>
          <img src={VerifyFailedImg} alt="verify success" />
        </div>
        <div className='text-center mt-[20px]'>
          <p className='font-[600] text-[20px] leading-[24.2px]'>Verification not completed</p>
          <p className='font-[400] text-[16px] leading-[19.36px] pt-3 px-[5px]'>The ImHuman account you are using to verify doesn’t match your linked ImHuman account. Please try again with the correct account.</p>
        </div>
        <div className='absolute bottom-5 w-full right-0 px-8'>
          <Button background={true} disabled={false} text={"View my verification code"} onClick={()=> {navigate("/profileverify")}}/>
          <Button background={false} disabled={false} text={"Cancel"} onClick={()=> {navigate("/hellohuman")}}/>
        </div>
      </div>
    </div>
  )
}
