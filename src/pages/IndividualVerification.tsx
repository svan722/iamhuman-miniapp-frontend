import { useState } from "react";
import PortalCard from "../components/individual_verify/PortalCard";
import { IoIosArrowBack } from "react-icons/io";
import ActivePortalModal from "../components/individual_verify/ActivePortalModal";
import { useNavigate } from "react-router-dom";

export default function IndividualVerification() {
  const defaultName="Name";
  const [openModal, setOpenModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const active = () => {
    setIsActive(true);
    setOpenModal(false);
  }

  const cancel = () => {
    setIsActive(false);
    setOpenModal(false);
  }

  return (
    <>
      <div className="p-[30px]" style={{fontFamily: "Inter"}}>
        <div className="">
          <div className="flex justify-between items-center font-semibold text-2xl mb-8">
            <div onClick={() => navigate("/upgrade_premium")}><IoIosArrowBack/></div>
            <span className="text-[16px] font-[600] leading-[19.36px]">Individual Verification</span>
            <span className="flex-none"/>
          </div>
          <PortalCard _active={isActive} name={defaultName} onClick={()=> {setOpenModal(true)}}/>
          <PortalCard _active={false} name={defaultName} onClick={()=> {setOpenModal(true)}}/>
          <PortalCard _active={false} name={defaultName} onClick={()=> {setOpenModal(true)}}/>
        </div>
      </div>
      {openModal&&<ActivePortalModal active={active} cancel={cancel}/>}
    </>
  )
}
