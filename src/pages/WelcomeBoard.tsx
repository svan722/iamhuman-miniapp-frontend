import { useState } from "react";
import Header from "../components/header/Header";
import BoxIllustraionImg from "../assets/images/box_illustration.png";
import Shape from "../assets/images/shape.png";
import Button from "../components/button/Button";
import VerifyModal from "../components/verify/VerifyModal";

export default function WelcomeBoard() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
    <div className="w-full h-full bg-[url('/assets/images/bg.png')] bg-no-repeat bg-center bg-cover relative overflow-hidden">
      <Header isBlack={false}/>
      <div className="px-4 py-1">
        <div className="p-4 rounded-lg bg-white border-[#D3D3D3] border">
          <div>
            <h2 className="text-[40px] font-semibold leading-[38px]">Welcome to PrivaseaBot</h2>
            <p className="text-base font-medium leading-[22px]">Verify your human liveness, edit personal information, and verify your group members' liveness on Telegram.</p>
          </div>
          <div>
            <div className="flex justify-center">
              <img className="my-[10px]" src={BoxIllustraionImg} alt="Box"/>  
            </div>
            <div className="flex items-center justify-center">
              <p className="text-sm font-normal leading-[22px]">Powered by</p>
              <img src={Shape}/>
              <p className="font-noto text-[8px] tracking-[0.2rem] text-[#162749] ml-1">PRIVASEA</p>
            </div>
          </div>
          <div className="py-3 px-5 border border-[#D3D3D3] rounded-lg">
            <p className="font-semibold text-xl leading-6 text-center">Set up with ImHuman App</p>
            <Button background={true} text="Link ImHuman APP" onClick={()=>setOpenModal(true)}/>
          </div>  
        </div>
      </div> 
      {openModal&&<VerifyModal/>}
    </div>
    </>
  )
}
