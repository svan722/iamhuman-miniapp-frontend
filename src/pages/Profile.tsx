import Header from "../components/header/Header";
import SmallSpaceImg from "../assets/images/small_space.png";
import { useState } from "react";
import Button from "../components/button/Button";

export default function Profile() {
  const [inputText, setInputText] = useState("");
  const [characterLimit] = useState(150);
  // event handler
  const handleChange = (event: any) => {
    setInputText(event.target.value);
  };

  return (
    <>
      <Header isBlack={true}/>
      <div className="px-4">
        <div className="border rounded-lg border-[#D3D3D3] px-4 py-4">
          <h1 className="font-semibold text-xl leading-6">Edit your profile</h1>
          <div className="flex items-center pt-3">
            <div className="w-6 h-6 bg-black rounded-md p-[1px]">
              <img src={SmallSpaceImg} alt="logo"/>
            </div>
            <span className="mx-2">yunanX3202</span>
          </div>
          <div>
            <label className="text-[16px]">Personal bio</label>
            <textarea className="w-full border border-[#D3D3D3] rounded-md" rows={3} value={inputText} onChange={handleChange}/>
            <span>{inputText.length}/{characterLimit} characters</span>
          </div>
          <div className="my-3">
            <label className="text-[16px] leading-[19px] font-normal">X link</label>
            <input className="w-full h-9 border border-[#D3D3D3] rounded-md p-2 placeholder:text-[16px] leading-[19px] text-[#00000099] font-normal" placeholder="Enter your X profile link"/>
          </div>
          <div className="my-3">
            <label className="text-[16px] leading-[19px] font-normal">Discord username</label>
            <input className="w-full h-9 border border-[#D3D3D3] rounded-md p-2 placeholder:text-[16px] leading-[19px] text-[#00000099] font-normal" placeholder="Enter your Discord name"/>
          </div>
          <div className="my-3">
            <label className="text-[16px] leading-[19px] font-normal">Personal website link</label>
            <input className="w-full h-9 border border-[#D3D3D3] rounded-md p-2 placeholder:text-[16px] leading-[19px] text-[#00000099] font-normal" placeholder="Enter your website"/>
          </div>
          <Button background={true} text="Verify to save edits"/>
        </div>
      </div>
    </>
  )
}
