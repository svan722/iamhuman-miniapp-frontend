// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import GroupImg from "../assets/images/group-verify.png";
import PencilImg from "../assets/images/pencil.png";
import CubicImg from "../assets/images/cubic.png";
import { IoIosArrowBack } from "react-icons/io";
import Footer from "../components/footer/Footer";

export default function GroupCertification() {
  // const [isFree, setIsFree] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="pt-[10px] " style={{fontFamily: "Inter"}}>
      <div className="px-4 pb-[115px] bg-white">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center font-semibold text-2xl mb-8">
            <div onClick={() => navigate("/upgrade_premium")}><IoIosArrowBack/></div>
            <span className="text-[16px] font-[600] leading-[19.36px]">Group Certification</span>
            <span className="flex-none"/>
          </div>
          <div className="rounded-[8px] bg-[#F5F5F5] p-[15px] mt-[15px] cursor-pointer shadow-lg shadow-[#7E8BFF55]" style={{ background: "linear-gradient(90deg, white 55%, #6486FF)" }}>
            <div className="flex items-center">
              <img src={GroupImg} alt="group verify" />
              <div className="text-[20px] font-[600] leading-[24.2px] ml-[5px]">Group Verification</div>
            </div>
            <div className="text-[16px] font-[400] leading-[19.36px] mt-[5px]">Ask your members to prove their Human Likeness in ImHuman App</div>
            <div className="flex items-center justify-end mt-[20px]">
              <div className="text-[16px] font-[600] leading-[19.36px]">Share verification code</div>
              <IoIosArrowForward className="inline text-xl ml-[5px]"/>
            </div>
          </div>
          <div className="rounded-[8px] mt-[20px] p-[15px] shadow-lg shadow-[#7E8BFF55]">
            <div className="text-[14px] font-[400] leading-[16.94px]">Member’s Proof-of-Human time</div>
            <div className="flex items-center justify-between mt-[5px]">
              <div className="text-[20px] font-[600] leading-[24.2px]">5 days <span className="text-[14px] font-[400] leading-[16.94px]">left</span></div>
              <img src={PencilImg} alt="edit date" className="w-[11px] h-[11px] cursor-pointer" />
            </div>
          </div>
          <div className="mt-[20px] rounded-[8px] border border-[#D3D3D3] p-[15px] flex flex-col items-center">
            <div className="text-[16px] font-[600] leading-[22px]">Verified members</div>
            <img src={CubicImg} alt="cubic" className="w-[120px] h-[120px]" />
            <div className="text-[16px] font-[400] leading-[19.36px]">No one has verified yet</div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center fixed bottom-0">
        <Footer/>
      </div>
        
    </div>
  )
}
