import { useState } from "react";
import PortalCard from "../components/individual_verify/PortalCard";
import { IoIosArrowBack } from "react-icons/io";
import ActivePortalModal from "../components/individual_verify/ActivePortalModal";

export default function IndividualVerification() {
  const defaultName="Name";
  const [openModal, setOpenModal] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const active = () => {
    setIsActive(true);
    setOpenModal(false);
  }

  return (
    <div style={{fontFamily: "Inter"}}>
      <div className="px-4 pb-[115px]">
        <div className="flex justify-between items-center font-semibold text-base mb-8">
          <span><IoIosArrowBack/></span>
          <span>Individual Verification</span>
          <span className="flex-none"/>
        </div>
        <PortalCard _active={isActive} name={defaultName} onClick={()=> {setOpenModal(true)}}/>
        <PortalCard _active={false} name={defaultName} onClick={()=> {setOpenModal(true)}}/>
        <PortalCard _active={false} name={defaultName} onClick={()=> {setOpenModal(true)}}/>
      </div>
      {openModal&&<ActivePortalModal active={active}/>}
    </div>
  )
}
