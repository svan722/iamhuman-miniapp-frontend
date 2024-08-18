import { useEffect } from "react";
import Button from "./button/Button";
// import axios from "axios";
// import { BASE_API } from "../../config/config";
// import { useNavigate } from "react-router-dom";

interface IDCheckModalProps {
  close: () => void
}

export default function IDCheckModal(props: IDCheckModalProps) {
  // const  navigate = useNavigate();
  
  useEffect(() => {
  
    return () => { };
  }, []);

  return (
    <div className={`w-full h-[50%] p-[30px] absolute bottom-[0%] block rounded-lg bg-white border-[#D3D3D3] border modal-anim-slideIn`} style={{fontFamily: "Inter"}}>
      <div className="flex flex-col items-center p-[10px]">
        <div className="text-[20px] font-[600] text-center leading-[24.2px] mb-[10px]">Set a username on Telegram before linking PrivaseaBot with the ImHuman App</div>
        <div className="text-[16px] font-[400] leading-[22px] text-center">You can only link ImHuman if you have a username. Set it up in your Telegram settings before you continue.</div>
      </div>
      <div onClick={props.close}>
        <Button background={true} disabled={false} text="Got it" />
      </div>
    </div>
  )
}
