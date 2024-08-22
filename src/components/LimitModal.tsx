import Button from "./button/Button";
// import axios from "axios";
// import { BASE_API } from "../../config/config";
// import { useNavigate } from "react-router-dom";

interface LimitModalProps {
  gotit: () => void
  close: () => void
}

export default function LimitModal(props: LimitModalProps) {

  return (
    <div className={`w-full p-[30px] absolute bottom-[-40%] block rounded-lg bg-white border-[#D3D3D3] border modal-anim-slideIn`} style={{fontFamily: "Inter"}}>
      <div className="flex flex-col items-center p-[10px]">
        <div className="text-[20px] font-[600] text-center leading-[24.2px] mb-[10px]">You have reached the maximum limit for linking ImHuman accounts</div>
        <div className="text-[16px] font-[400] leading-[22px] text-center">You can link up to 20 ImHuman accounts each month. At the start of every month, your limit will reset.</div>
      </div>
      <div onClick={props.gotit}>
        <Button background={true} disabled={false} text="Got it" />
      </div>
      <div onClick={props.close}>
        <Button background={false} disabled={false} text="Cancel" />
      </div>
    </div>
  )
}
