import { useState, createContext, useEffect } from "react";
import axios from "axios";
import SmallSpaceImg from "../assets/images/small_space.png";
import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";
import VerifyModal1 from "../components/verify/VerifyModal1";
import { useTelegram } from "../context/TelegramProvider";
import { validateDiscordUsername, validateURL, validateTwitterUrl } from "../utils/validate";
import { BASE_API } from "../config/config";

interface IUpdateUserData {
  xlink?: String,
  discordUsername?: String,
  personalWeb?: String
}
export const UpdateUserDataContext = createContext<IUpdateUserData>({});

export default function Profile() {
  const { user } = useTelegram();

  const [bio, setBio] = useState("");
  const [xlink, setXlink] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [personal, setPersonal] = useState("")
  const [openModal, setOpenModal] = useState(false);
  const [characterLimit] = useState(150);
  const [isXvalid, setIsXvalid] = useState(true);
  const [discordValid, setDiscordValid] = useState(true);
  const [personalValid, setPersonalValid] = useState(true);
  // const [otp, setOtp] = useState("0000");

  const [updateUserData, setUpdateUserData]  = useState({});
  // event handler
  const handleChange = (event: any) => {
    setBio(event.target.value);
  };

  const XhandleChange = (event: any) => {
    setXlink(event.target.value);
    setIsXvalid(validateTwitterUrl(event.target.value));
  };

  const discordHandleChange = (event: any) => {
    setDiscordUsername(event.target.value);
    setDiscordValid(validateDiscordUsername(event.target.value).isValid);
  };
  const personalHandleChange = (event: any) => {
    setPersonal(event.target.value);
    setPersonalValid(validateURL(event.target.value));
  };

  const verify = async () => {

    const userData = {
      bio: bio,
      x_link: xlink,
      discordUsername: discordUsername,
      personal_website: personal,
      // otp: 
    }
    setUpdateUserData(userData);

    console.log("UserData", userData);
    if(isXvalid&&personalValid&&discordUsername) {
      setOpenModal(true);
    }
  }

  useEffect(() => {
    console.log("profile");
    const username = user?user.username:"user123";
    async function currentUser() {
      axios.post(BASE_API + `getcurrentuser/${username}`,{username:username})
        .then(res=> {
          console.log("res", res);
          setBio(res.data.bio);
          setXlink(res.data.x_link);
          setDiscordUsername(res.data.discordUsername);
          setPersonal(res.data.personal_website);

        })
    }

    currentUser();
  }, []);

  return (
    <UpdateUserDataContext.Provider value={updateUserData}>
      <div className="pt-[20px] " style={{fontFamily: "Inter"}}>
        <div className="-z-20">
          <div className="px-4 pb-[115px] bg-white">
            <div className="border rounded-lg border-[#D3D3D3] px-4 py-4">
              <h1 className="font-semibold text-xl leading-6">Edit your profile</h1>
              <div className="flex items-center pt-3">
                <div className="w-6 h-6 bg-black rounded-md p-[1px]">
                  <img src={SmallSpaceImg} alt="logo"/>
                </div>
                <span className="mx-2 my-2">{user?.username}</span>
              </div>
              <div>
                <label className="text-[16px] leading-[20px] font-normal">Personal bio</label>
                <textarea className="w-full h-[180px] border border-[#D3D3D3] rounded-md p-3 hover:outline-black outline-1 break-all" placeholder="Write a short intro about yourselef" rows={10} value={bio} maxLength={150} onChange={handleChange}/>
                <span>{bio.length}/{characterLimit} characters</span>
              </div>
              <div className="my-4">
                <label className="text-[16px] leading-[20px] font-normal" >X link</label>
                <input className="w-full h-9 border border-[#D3D3D3] rounded-md p-2 placeholder:text-[16px] leading-[19px] font-normal hover:outline-black outline-1" placeholder="Enter your X profile link" value={xlink} onChange={XhandleChange}/>
                {!isXvalid?<p className="text-red-500 text-xs">Type X link correctly</p>:""}
              </div>
              <div className="my-4">
                <label className="text-[16px] leading-[20px] font-normal" >Discord username</label>
                <input className="w-full h-9 border border-[#D3D3D3] rounded-md p-2 placeholder:text-[16px] leading-[19px] font-normal hover:outline-black outline-1" placeholder="Enter your Discord name" value={discordUsername} onChange={discordHandleChange}/>
                {!discordValid?<p className="text-red-500 text-xs">Type Discord username correctly</p>:""}
              </div>
              <div className="my-4">
                <label className="text-[16px] leading-[20px] font-normal">Personal website link</label>
                <input className="w-full h-9 border border-[#D3D3D3] rounded-md p-2 placeholder:text-[16px] leading-[19px] font-normal hover:outline-black outline-1" placeholder="Enter your website" value={personal} onChange={personalHandleChange}/>
                {!personalValid?<p className="text-red-500 text-xs">Type personal website link correctly</p>:""}
              </div>
              <Button background={true} disabled={false} text="Verify to save edits" onClick={()=>verify()}/>
            </div>
          </div>
          {openModal&&<VerifyModal1 close={()=>{setOpenModal(false)}}/>}
        </div>
        <div className="fixed bottom-0 w-full z-10">
          <Footer/>
        </div>
      </div>
    </UpdateUserDataContext.Provider>
  )
}
