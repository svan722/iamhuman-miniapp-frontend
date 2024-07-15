import FreeLogo from "../../assets/images/free_brand_logo_g.png";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

export default function Free() {
  return (
    <div>
      <div className="flex justify-center">
        <img src={FreeLogo}/>
      </div>
      <div className="flex justify-center">
        <ul>
          <li className="font-normal text-base py-1">
            <IoMdCheckmark className="inline mr-3"/>
            <span className="inline">Editing Personal Information</span>  
          </li>
          <li className="font-normal text-base py-1 text-[#00000099]">
            <IoMdClose className="inline mr-3"/>
            <span className="inline">Provide Individual Verification</span>
          </li>
          <li className="font-normal text-base py-1 text-[#00000099]">
            <IoMdClose className="inline mr-3"/>
            <span className="inline">Initiate Group Verification</span>
          </li>
        </ul>
      </div>
      <p className="text-center mt-8">
        Upgrade your plan to <b>Premium</b> to<br/> access more Proof features
      </p>
    </div>
  )
}
