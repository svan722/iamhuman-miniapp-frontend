import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io'
import UpgradeLogo from "../assets/images/account_upgrade.png";
import Ic_proof from "../assets/images/ic_tg_proof.svg";
import Ic_certificte from "../assets/images/ic_certificate.svg";
import Footer from '../components/footer/Footer';

export default function SelectVerification() {

  const navigate = useNavigate();

  return (
    <div style={{fontFamily: "Inter"}}>
      <div className='px-8 pb-[115px]'>
        <div className="flex justify-center">
          <div className={`font-semibold text-base leading-[19px] text-center px-4 py-1  rounded-[84px] transition-all duration-200  bg-[#FAF6F2]`}>Premium</div>
        </div>
        <div className="text-center my-5 font-normal text-xs">
          <span className="inline">{"Upgrade Plan"}</span>
          <IoIosArrowForward className="inline text-base"/>
        </div>
        <div className="flex justify-center -mt-10">
          <img src={UpgradeLogo}/>
        </div>
        <div className='p-4 font-semibold text-base leading-[19px] border rounded-lg border-[#F5F5F5] box-border bg-[#F5F5F5]'>
          <div className=' flex he-[98px]'>
            <span><img src={Ic_proof} alt="ic proof"/></span>
            <span>Individual Verification</span>
          </div>
          <div className='flex he-[98px] items-center pl-[56px] mt-[18px] cursor-pointer' onClick={()=> {navigate("/individual_verification")}}>
            <span className='bg-[#6486FF] w-[9px] h-[9px] rounded-[50%] mr-[5px]'></span>
            <span>Individual Verification</span>
            <IoIosArrowForward className="text-base ml-2"/>
          </div>
        </div>
        <div className='p-4 font-semibold text-base leading-[19px] border rounded-lg border-[#F5F5F5] box-border bg-[#F5F5F5] mt-4'>
          <div className=' flex he-[98px]'>
            <span><img src={Ic_certificte} alt="ic proof"/></span>
            <span>Group Verification</span>
          </div>
          <div className='flex he-[98px] items-center pl-[75px] mt-[18px] cursor-pointer'>
            <span className='bg-[#6486FF] w-[9px] h-[9px] rounded-[50%] mr-[5px]'></span>
            <span>Initiate verification</span>
            <IoIosArrowForward className="text-base ml-2"/>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer/>
      </div>
    </div>
  )
}
