import { IoIosArrowBack } from "react-icons/io"
import SearchIcon from "../assets/images/search.svg";
import AddUserIcon from "../assets/images/ic_Add_user.png";
import ThreeDbox from  "../assets/images/3dbox.png";

export default function IndividualActivePortal() {
  return (
    <>
      <div style={{fontFamily: "Inter"}}>
        <div className="px-8 pb-[115px]">
          <div className="flex justify-between items-center font-semibold text-base mb-8">
            <span><IoIosArrowBack/></span>
            <span>Portal 1: EAX049</span>
            <span className="flex-none"/>
          </div>
          <div className="relative">
            <input className="w-full h-[56px] bg-[#F5F5F5] border border-[#F5F5F5] rounded-lg outline-none pl-[45px]" type="text" name="search" placeholder="Search"/>
            <img className="absolute top-5 left-3" src={SearchIcon} />
            <img className="absolute top-5 right-3 hover:cursor-pointer" src={AddUserIcon} />
          </div>
          <div className="py-7">
            <h1 className="text-center text-base font-normal">Add User</h1>
            <div className="flex justify-center py-5">
              <img src={ThreeDbox} alt="3d box"/>
            </div>
            <p className="text-center text-base font-normal">Add users to this Portal and send them<br/> unique verification requests.  </p>
          </div>
        </div>
      </div>
    </>
  )
}
