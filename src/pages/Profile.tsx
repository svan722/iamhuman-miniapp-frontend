import Header from "../components/header/Header";
import SmallSpaceImg from "../assets/images/small_space.png";
import { useState } from "react";
import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";
import VerifyModal1 from "../components/verify/VerifyModal1";

export default function Profile() {
  const [inputText, setInputText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [characterLimit] = useState(150);
  // event handler
  const handleChange = (event: any) => {
    setInputText(event.target.value);
  };

  return (
    <>
      <Header isDark={true}/>
      <div className="-z-20">
        <div className="px-4 pb-[115px] bg-white">
          <div className="border rounded-lg border-[#D3D3D3] px-4 py-4">
            <h1 className="font-semibold text-xl leading-6">Edit your profile</h1>
            <div className="flex items-center pt-3">
              <div className="w-6 h-6 bg-black rounded-md p-[1px]">
                <img src={SmallSpaceImg} alt="logo"/>
              </div>
              <span className="mx-2 my-2">yunanX3202</span>
            </div>
            <div>
              <label className="text-[16px] leading-[20px] font-normal">Personal bio</label>
              <textarea className="w-full h-[180px] border border-[#D3D3D3] rounded-md p-3 hover:outline-black outline-1 break-all" placeholder="Write a short intro about yourselef" rows={10} value={inputText} maxLength={150} onChange={handleChange}/>
              <span>{inputText.length}/{characterLimit} characters</span>
            </div>
            <div className="my-4">
              <label className="text-[16px] leading-[20px] font-normal">X link</label>
              <input className="w-full h-9 border border-[#D3D3D3] rounded-md p-2 placeholder:text-[16px] leading-[19px] font-normal hover:outline-black outline-1" placeholder="Enter your X profile link"/>
            </div>
            <div className="my-4">
              <label className="text-[16px] leading-[20px] font-normal">Discord username</label>
              <input className="w-full h-9 border border-[#D3D3D3] rounded-md p-2 placeholder:text-[16px] leading-[19px] font-normal hover:outline-black outline-1" placeholder="Enter your Discord name"/>
            </div>
            <div className="my-4">
              <label className="text-[16px] leading-[20px] font-normal">Personal website link</label>
              <input className="w-full h-9 border border-[#D3D3D3] rounded-md p-2 placeholder:text-[16px] leading-[19px] font-normal hover:outline-black outline-1" placeholder="Enter your website"/>
            </div>
            <Button background={true} text="Verify to save edits" onClick={()=>{setOpenModal(true)}}/>
          </div>
        </div>
        {openModal&&<VerifyModal1 close={()=>{setOpenModal(false)}}/>}
      </div>
      <div className="fixed bottom-0 w-full z-10">
        <Footer/>
      </div>
    </>
  )
}
