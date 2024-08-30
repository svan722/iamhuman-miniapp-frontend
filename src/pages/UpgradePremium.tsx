// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import UpgradePremiumImg from "../assets/images/upgrade_premium.png";
import IndividualImg from "../assets/images/individual-verify.png";
import GroupImg from "../assets/images/group-verify.png";
// import Free from "../components/upgrate_premium/Free";
// import Premium from "../components/upgrate_premium/Premium";
// import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";

export default function UpgradePremium() {
  // const [isFree, setIsFree] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="pt-[10px] " style={{fontFamily: "Inter"}}>
      <div className="px-4 pb-[115px] bg-white">
        <div className="px-4 py-4">
          <div className="flex justify-center mt-[20px]">
            {/* <div className={`font-semibold text-base leading-[19px] text-center px-4 py-1 rounded-[84px] transition-all duration-200 ${isFree?"translate-x-[50px] bg-[#EAECF1]":"-translate-x-[2.5rem] bg-[#FAF6F2]"} `} onClick={()=> {setIsFree(true)}}>Free</div> */}
            <div className={`font-semibold text-base leading-[19px] text-center px-4 py-1 rounded-[84px] bg-[#FAF6F2]`}>Premium</div>
          </div>
          <div className="text-center my-[5px] font-normal text-xs">
            <span className="inline mr-[3px]">{"Change Plan"}</span>
            <IoIosArrowForward className=" mb-[2px] inline text-base"/>
          </div>
          {/* {isFree?<Free/>:<Premium/>} */}
          <div className="flex justify-center mt-[15px]">
            <img src={UpgradePremiumImg} alt="upgrade premium" />
          </div>
          <div className="rounded-[8px] bg-[#F5F5F5] p-[15px] mt-[20px] cursor-pointer" onClick={() => navigate("/individual_verification")}>
            <div className="flex items-center">
              <img src={IndividualImg} alt="individual verify" />
              <div className="text-[16px] font-[600] leading-[19.36px]">Individual Verification</div>
            </div>
            <div className="flex items-center justify-end mt-[20px]">
              <div className="w-[9px] h-[9px] bg-[#6486FF] rounded-[50%] mr-[5px] mb-[1px]"></div>
              <div className="text-[16px] font-[600] leading-[19.36px]">My verifications</div>
              <IoIosArrowForward className="inline text-xl ml-[5px]"/>
            </div>
          </div>
          <div className="rounded-[8px] bg-[#F5F5F5] p-[15px] mt-[15px] cursor-pointer">
            <div className="flex items-center">
              <img src={GroupImg} alt="group verify" />
              <div className="text-[16px] font-[600] leading-[19.36px]">Group Verification</div>
            </div>
            <div className="flex items-center justify-end mt-[20px]">
              <div className="w-[9px] h-[9px] bg-[#6486FF] rounded-[50%] mr-[5px] mb-[1px]"></div>
              <div className="text-[16px] font-[600] leading-[19.36px]">Initiate verifications</div>
              <IoIosArrowForward className="inline text-xl ml-[5px]"/>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center fixed bottom-0">
        <Footer/>
      </div>
        
    </div>
  )
}
