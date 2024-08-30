import closeSVG from "../../assets/images/bclose.svg";
import Button from "../button/Button";

interface ActivePortalProps {
  active?: ()=>void
  cancel?: ()=>void
}

export default function ActivePortalModal(props: ActivePortalProps) {

  return (
    <div className="pt-[10px] w-full absolute modal-anim-slideIn bottom-[0px] block rounded-lg bg-white border-white shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] border z-10">
      <div className="p-[15px]">
        <img className="float-end" src={closeSVG} alt="close" onClick={props.cancel} />
        <p className="font-[600] text-[20px] leading-[24.2px] text-center pt-[50px]">Activate Portal 1</p>
        <p className="font-[400] text-[16px] leading-[22px] text-center pt-4 px-[40px]">
          You can have a maximum of 3 active Verification Portals. After activating your Portal, you can add people to your portal to <b>request their Human Likeness Verification</b> and keep track of their verification status.
        </p>
        <div className="mt-5 mx-[20px]">
          <label className="font-[400] text-[16px] leading-[22px]">Name your Portal 1</label>
          <input placeholder="Maximum 12 characters" className="w-full h-9 border border-[#D3D3D3] rounded-md p-2 placeholder:text-[16px] leading-[19px] font-normal hover:outline-black outline-1 mt-1"/>
        </div>
        <div className="py-2 pt-[30px] mx-[20px]">
          <Button background={true} disabled={false} text="Activate" onClick={props.active}/>
          <Button background={false} disabled={false} text="Cancel" onClick={props.cancel}/>
        </div> 
      </div>
    </div>
  )
}
