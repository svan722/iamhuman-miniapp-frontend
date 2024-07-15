// import closePng from "../../assets/images/close.png";
// import returnPng from "../../assets/images/return.png"; 
import closeSVG from "../../assets/images/close.svg";
import returnSVG from "../../assets/images/return.svg"; 
import bcloseSVG from "../../assets/images/bclose.svg";
import breturnSVG from "../../assets/images/breturn.svg"; 

interface HeaderProps {
  isDark:boolean
}


export default function Header(props: HeaderProps) {
  return (
    <>
      <div className="w-full flex px-4 py-3 justify-between">
        <img src={!props.isDark?closeSVG:bcloseSVG} alt="close"/>
        <div>
          <p className={`text-base ${!props.isDark?"text-white":"text-black"} font-medium`}>PrivaseaBot</p>
          <p className="text-[14px] font-medium text-[#D3D3D3] text-center">Bot</p>
        </div>
        <img className="" src={!props.isDark?returnSVG:breturnSVG} alt="return"/>
      </div>      
    </>
  )
}
