import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import GroupImg from "../assets/images/group-verify.png";
import PencilImg from "../assets/images/pencil.png";
import CubicImg from "../assets/images/cubic.png";
import DownloadImg from "../assets/images/download.png";
import { IoIosArrowBack } from "react-icons/io";
import Footer from "../components/footer/Footer";
import GroupVerifyModal from "../components/GroupVerifyModal";

export default function GroupCertification() {
  const [proofTime, setProofTime] = useState("5");
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const navigate = useNavigate();

  const editProofTime = (e:any) => {
    setProofTime(e.target.value);
  }

  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter')
      setIsShowEdit(false);
  }

  const clickShare = () => {
    setIsShowModal(false);
  }

  const clickClose = () => {
    setIsShowModal(false);
  }

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
            <div className="flex items-center justify-end mt-[20px]" onClick={() => setIsShowModal(true)}>
              <div className="text-[16px] font-[600] leading-[19.36px]">Share verification code</div>
              <IoIosArrowForward className="inline text-xl ml-[5px]"/>
            </div>
          </div>
          <div className="rounded-[8px] mt-[20px] p-[15px] shadow-lg shadow-[#7E8BFF55]">
            <div className="text-[14px] font-[400] leading-[16.94px]">Member’s Proof-of-Human time</div>
            <div className="flex items-center justify-between mt-[5px]">
              <div className="flex items-center gap-[5px]">
                {isShowEdit && <input type="text" value={proofTime} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => editProofTime(e)} className="px-[10px] py-[5px] rounded-[8px] border border-black w-[50px]" />}
                <div className="text-[20px] font-[600] leading-[24.2px]">{!isShowEdit && proofTime} days <span className="text-[14px] font-[400] leading-[16.94px]">left</span></div>
              </div>
              <img src={PencilImg} alt="edit date" onClick={() => {setIsShowEdit(true)}} className="w-[11px] h-[11px] cursor-pointer" />
            </div>
          </div>
          <div className="mt-[20px] rounded-[8px] border border-[#D3D3D3] p-[15px] flex flex-col items-center">
            <div className="flex justify-end w-full">
              <div className="flex justify-between w-[75%]">
                <div className="text-[16px] font-[600] leading-[22px]">Verified members</div>
                <img src={DownloadImg} alt="download" className="w-[20px] h-[20px]" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img src={CubicImg} alt="cubic" className="w-[120px] h-[120px]" />
              <div className="text-[16px] font-[400] leading-[19.36px]">No one has verified yet</div>
            </div>
          </div>
        </div>
      </div>
      {isShowModal && <GroupVerifyModal clickShare={clickShare} clickClose = {clickClose} proofTime={proofTime} />}
      <div className="w-full flex justify-center fixed bottom-0">
        <Footer/>
      </div>
        
    </div>
  )
}
