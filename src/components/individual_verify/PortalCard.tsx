// import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface PortalProps {
  _active: boolean,
  name: string,
  onClick?:() => void
}

export default function PortalCard(props: PortalProps) {
  // const [active, setActive] = useState(true);
  const active = props._active;

  return (
    <div className="p-4 bg-[#F5F5F5] border border-[#F5F5F5] rounded-lg h-[93px] mt-4">
      <div className="flex justify-between">
        <p className={`font-semibold text-base leading-[19px] ${active?"text-[#000000]":"text-[#D3D3D3]"}`}>{"Portal1"}</p>
        <p className={`font-semibold text-base leading-[19px] ${active?"text-[#000000]":"text-[#D3D3D3]"}`}>{props.name}</p>
      </div>
      <div className="grid grid-cols-4 font-semibold text-base leading-[19px] text-[#D3D3D3] justify-between mt-5">
        <div className="flex items-center">
          <div className={`${active?"w-[9px] h-[9px]":"w-[0px] h-[0px]"}  rounded-[50%] mr-[5px]`}></div>
          <div className={`${active?"text-[#6486FF]":"text-[#162749]"} cursor-pointer`}  onClick={props.onClick}>Active</div>
        </div>
        <div className={`flex items-center justify-end col-span-3 ${active?"text-[#000000]":"text-[#D3D3D3]"}`}>
          <span className="text-sm">Individual Verifications</span>
          <IoIosArrowForward className="text-base ml-2"/>
        </div>
      </div>
    </div>
  )
}
