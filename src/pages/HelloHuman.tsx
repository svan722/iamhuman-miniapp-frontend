import HumanSpaceImg from "../assets/images/human_space.png";
import HumanIdLogo from "../assets/images/HumanId_logo.png";
import SmallSpaceImg from "../assets/images/small_space.png";
import ArrowRight from "../assets/images/arrow-right.png";
import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";
import { useNavigate } from 'react-router-dom';

export default function HelloHuman() {
  const navigate = useNavigate();
  return (
    <div className="pt-[30px] " style={{fontFamily: "Inter"}}>
      <div className="px-8">
        <div className="text-center">
          <p className="font-semibold text-[32px] leading-[38px] mt-[-10px]">Hello human!</p>
          <p className="font-normal text-base px-6">Explore your ImHuman NFTs and rewards in ImHuman App </p>
        </div>
        <div className="flex justify-center pt-3">
          <img src={HumanSpaceImg} alt="Hello Human logo" className="w-[150px]"/>
        </div>
        <div className="flex justify-center pt-5">
          <img src={HumanIdLogo} alt="Human logo"/>
          <span className="font-bold text-base leading-[19px]">#4455</span>
        </div>
        <div className="w-full rounded-lg bg-[#F5F5F5] px-5 py-3 flex justify-between items-center mt-4">
          <div className="w-8 h-8 bg-black rounded-md flex justify-center items-center">
            <img src={SmallSpaceImg} alt="logo"/>
          </div>
          <div className="ml-[-50px]">
            <p>ImHuman account</p>
            <p className="font-semibold text-base">yunanX3202</p>
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
