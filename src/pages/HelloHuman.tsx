import HumanSpaceImg from "../assets/images/human_space.png";
import HumanIdLogo from "../assets/images/HumanId_logo.png";
import SmallSpaceImg from "../assets/images/small_space.png";
import ArrowRight from "../assets/images/arrow-right.png";
import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";
import { useTelegram } from "../context/TelegramProvider";
import { useNavigate } from 'react-router-dom';

export default function HelloHuman() {
  const navigate = useNavigate();
  const { user } = useTelegram(); 

  return (
    <div className="pt-[30px] " style={{fontFamily: "Inter"}}>
      <div className="px-8">
        <div className="text-center">
          <p className="font-[600] text-[32px] leading-[38.73px] mt-[-10px]">Hello human!</p>
          <p className="font-[400] text-[16px] leading-[22px] px-6">Explore your ImHuman NFTs and rewards in ImHuman App </p>
        </div>
        <div className="flex justify-center my-[20px]">
          <img src={HumanSpaceImg} alt="Hello Human logo" className="w-[160px]"/>
        </div>
        <div className="flex justify-center items-center">
          <img className="w-[24px]" src={HumanIdLogo} alt="Human logo"/>
          <span className="font-[700] text-[16px] leading-[19.36px] ml-[5px]">#4455</span>
        </div>
        <div className="w-full cursor-pointer rounded-lg bg-[#F5F5F5] px-5 py-3 flex justify-between items-center mt-4" onClick={() => navigate('/viewprofile')}>
          <div className="w-8 h-8 bg-black rounded-md flex justify-center items-center">
            <img className="w-[32px]" src={SmallSpaceImg} alt="logo"/>
          </div>
          <div className="font-[400] text-[16px] leading-[19.36px] ml-[-50px]">
            <p className="opacity-[60%]">ImHuman account</p>
            <p>{user?.username}</p>
          </div>
          <img src={ArrowRight} alt="arrow right"/>
        </div>
        <Button background={true} disabled={false} text="Edit personal information" onClick={()=>navigate("/editprofile")}/>
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer/>
      </div>
    </div>
  )
}
