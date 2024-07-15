import { useState } from "react";
import Header from "../components/header/Header";
import { IoIosArrowForward } from "react-icons/io";
import Free from "../components/upgrate_premium/Free";
import Premium from "../components/upgrate_premium/Premium";
import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";

export default function UpgradePremium() {
  const [isFree, setIsFree] = useState(true);
  return (
    <div>
      <Header isDark={true}/>
      <div className="px-4 pb-[115px] bg-white">
        <div className="border rounded-lg border-[#D3D3D3] px-4 py-4">
          <div className="flex justify-center">
            <div className={`font-semibold text-base leading-[19px] text-center px-4 py-1 rounded-[84px] transition-all duration-200 ${isFree?"translate-x-[50px] bg-[#EAECF1]":"-translate-x-[2.5rem] bg-[#FAF6F2]"} `} onClick={()=> {setIsFree(true)}}>Free</div>
            <div className={`font-semibold text-base leading-[19px] text-center px-4 py-1  rounded-[84px] transition-all duration-200 ${isFree?"translate-x-[50px] bg-[#FAF6F2]":"-translate-x-[2.5rem] bg-[#EAECF1]"}`}onClick={()=> {setIsFree(false)}}>Premium</div>
          </div>
          <div className="text-center my-5 font-normal text-xs">
            <span className="inline">{"Upgrade Plan"}</span>
            <IoIosArrowForward className="inline text-base"/>
          </div>
          {isFree?<Free/>:<Premium/>}
        </div>
        <Button background={true} text="Upgrade to Premium"/>
      </div>
      <div className="w-full flex justify-center fixed bottom-0">
        <Footer/>
      </div>
        
    </div>
  )
}
