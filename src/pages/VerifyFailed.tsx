import { useEffect } from "react";
import VerifyFaiedImg from "../assets/images/verify_failed.png";
import Button from '../components/button/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_API } from "../config/config";
import { useSelector } from 'react-redux';

export default function VerifyFaied() {
  const navigate = useNavigate();
  const otp = useSelector((state: { value: string }) => state.otp.value);

  const genernateNewCode = async () => {
    await axios.delete(BASE_API + `delete/opt/${otp}`)
      .then(() => {
        navigate("/linkverify");
      }).catch(err=> {
        console.log("OTP delete failed", err)
      })
    }

    useEffect(() => {
      console.log(otp, '<<<<<<<<get otp')
    }, [])

  return (
    <div className="pt-[10px]" style={{fontFamily: "Inter"}}>
      <div className='px-8'>
        <div className='flex justify-center mt-[80px]'>
          <img src={VerifyFaiedImg} alt="verify success" />
        </div>
        <div className='text-center mt-[20px]'>
          <p className='font-semibold text-2xl leading-[24.2px]'>Verification failed</p>
          <p className='font-normal text-[14px] pt-3'>Your code has expired. To link the ImHuman, you need to verify your Human Likeness using the new code</p>
        </div>
        <div className='absolute bottom-5 w-full right-0 px-8'>
          <Button background={true} disabled={false} text={"Generate a new verification code"} onClick={genernateNewCode}/>
          <Button background={false} disabled={false} text={"Cancel"} onClick={()=> {navigate("/")}}/>
        </div>
      </div>
    </div>
  )
}
