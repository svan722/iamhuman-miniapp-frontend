import VerifySuccessImg from "../assets/images/verify_success.png";
import Button from '../components/button/Button';
import { useNavigate } from 'react-router-dom';

export default function VerifyPassed() {
  const navigate = useNavigate();
  return (
    <div className="pt-[10px] " style={{fontFamily: "Inter"}}>
      <div className='px-8'>
        <div className='flex justify-center mt-[-20px]'>
          <img src={VerifySuccessImg} alt="verify success" />
        </div>
        <div className='text-center mt-[-20px]'>
          <p className='font-semibold text-2xl '>Verification passed!</p>
          <p className='font-normal text-[14px] pt-3'>Profile edits saved</p>
        </div>
        <div className='absolute bottom-5 w-full right-0 px-8'>
          <Button background={true} disabled={false} text={"Done!"} onClick={()=> {navigate("/viewprofile")}}/>
        </div>
      </div>
    </div>
  )
}
