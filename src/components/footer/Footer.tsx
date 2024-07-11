// import { useState } from "react";
// import Ic_space_g from "../../assets/images/ic_space_g.png"
// import Ic_profile_g from '../../assets/images/ic_profile_g.png';
// import Ic_badge_g from "../../assets/images/ic_badge_g.png";
import Ic_space from "../../assets/images/ic_space.png";
import Ic_profile from "../../assets/images/ic_profile.png";
import Ic_badge from "../../assets/images/ic_badge.png";

export default function Footer() {
  return (
    <div className="px-10 py-4 flex justify-between items-center shadow-[0_0_10px_-10px_rgba(0, 0, 0, 0.05)]">
      <div>
        <img src={Ic_space} alt="ic space" className="grayscale opacity-50 hover:cursor-pointer hover:grayscale-0 hover:opacity-100"/>
        <p className="font-normal text-[10px] text-[#D3D3D3] text-center">Space</p>
      </div>
      <div>
        <img src={Ic_badge} alt="ic badge" className="grayscale opacity-50 hover:cursor-pointer hover:grayscale-0 hover:opacity-100" />
        <p className="font-normal text-[10px] text-[#D3D3D3] text-center">Proof</p>
      </div>
      <div>
        <img src={Ic_profile} alt="ic profile" className="grayscale opacity-50 hover:cursor-pointer hover:grayscale-0 hover:opacity-100"/>
        <p className="font-normal text-[10px] text-[#D3D3D3] text-center">Profile</p>
      </div>
    </div>
  )
}
