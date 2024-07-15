import { useState, useEffect } from "react";
import Ic_space_g from "../../assets/images/ic_space_g.png"
import Ic_profile_g from '../../assets/images/ic_profile_g.png';
import Ic_badge_g from "../../assets/images/ic_badge_g.png";
import Ic_space from "../../assets/images/ic_space.png";
import Ic_profile from "../../assets/images/ic_profile.png";
import Ic_badge from "../../assets/images/ic_badge.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const [seletState, setSelectState] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToSpace = () => {
    setSelectState(0);
    console.log("navigate", navigate);
    console.log("navigate", location.pathname);
    navigate("/hellohuman");
  }
  const navigateToPremium = () => {
    setSelectState(1);
    navigate("/upgrade_premium");
  }
  const navigateToProfile = () => {
    setSelectState(2);
    navigate("/editprofile");
  }
  
  useEffect(() => {
  	if(location.pathname === "/hellohuman") {setSelectState(0)}
    if(location.pathname === "/upgrade_premium") {setSelectState(1)}
    if(location.pathname === "/editprofile") {setSelectState(2)}
  	return () => {
      
  	};
  }, []);

  return (
    <div className="w-full h-[83px] bg-white py-4 grid grid-cols-3 items-center justify-center shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] z-10">
      <div onClick={()=>navigateToSpace()} className="flex flex-col items-center">
        <img src={seletState===0?Ic_space:Ic_space_g} alt="ic space" className={`${seletState!==0?"grayscale opacity-50":""} hover:cursor-pointer hover:grayscale-0 hover:opacity-100 `}/>
        <p className={`font-normal text-[10px] ${seletState!==0?"text-[#D3D3D3]":"text-black"} text-center`}>Space</p>
      </div>
      <div onClick={()=>navigateToPremium()} className="flex flex-col items-center">
        <img src={seletState===1?Ic_badge:Ic_badge_g} alt="ic badge" className={`${seletState!==1?"grayscale opacity-50":""} hover:cursor-pointer hover:grayscale-0 hover:opacity-100`} />
        <p className={`font-normal text-[10px] ${seletState!==1?"text-[#D3D3D3]":"text-black"} text-center`}>Proof</p>
      </div>
      <div onClick={()=>navigateToProfile()} className="flex flex-col items-center">
        <img src={seletState===2?Ic_profile:Ic_profile_g} alt="ic profile" className={`${seletState!==2?"grayscale opacity-50":""} hover:cursor-pointer hover:grayscale-0 hover:opacity-100`}/>
        <p className={`font-normal text-[10px] ${seletState!==2?"text-[#D3D3D3]":"text-black"} text-center`}>Profile</p>
      </div>
    </div>
  )
}
  