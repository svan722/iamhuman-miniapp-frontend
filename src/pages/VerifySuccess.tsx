import Header from '../components/header/Header';
import VerifySuccessImg from "../assets/images/verify_success.png";
import Button from '../components/button/Button';
import { useNavigate } from 'react-router-dom';

export default function VerifySuccess() {
  const navigate = useNavigate();
  return (
    <div>
      <Header isBlack={true}/>
      <div className='px-8'>
        <div className='flex justify-center mt-[-20px]'>
          <img src={VerifySuccessImg} alt="verify success" />
        </div>
        <div className='text-center mt-[-20px]'>
          <p className='font-semibold text-2xl '>Verification passed!<br/> Linking successful</p>
          <p className='font-normal text-[14px] pt-3'>Your ImHuman App is now linked to your Telegram account. You can prove your TG account ownership and allow your group members to verify human likeness.</p>
        </div>
        <div>
          <Button background={true} text={"Done!"} onClick={()=> {navigate("/hellohuman")}}/>
          <Button background={false} text={"Edit personal information"}/>
        </div>
      </div>
    </div>
  )
}
