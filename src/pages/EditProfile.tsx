import { useState, createContext, useEffect } from "react";
import axios from "axios";
import SmallSpaceImg from "../assets/images/small_space.png";
import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";
import VerifyModal1 from "../components/verify/VerifyModal1";
import { useTelegram } from "../context/TelegramProvider";
import { validateDiscordUsername, validateURL, validateTwitterUrl } from "../utils/validate";
import { BASE_API } from "../config/config";
import RefreshModal1 from "../components/refresh/RefreshModal1";

interface IUpdateUserData {
  xlink?: String,
  discordUsername?: String,
  personalWeb?: String
}
export const UpdateUserDataContext = createContext<IUpdateUserData>({});
export const OtpContext = createContext<string>("");

export default function EditProfile() {
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
  const [openRefreshModal, setOpenRefreshModal] = useState(false);
  const [isVisible, setIsvisible] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [isVerify, setIsVerify] = useState(false);

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
    setIsVerify(true);
    await axios.get(BASE_API+`getotp/${user_id}`)
    .then(res => {
      if(res.data.code === 200) {
        console.log("OTP >>>", res.data)
        setOtp(res.data.otp);
        // setOpenVerifyModal(true);
      }  else {
        alert("You can't create OTP code");
      }
    })

    const userData = {
      user_id: user?user.username:"imhuman1",
      bio: bio,
      x_link: xlink,
      discordUsername: discordUsername,
      personal_website: personal,
      // otp: 
    }
    setUpdateUserData(userData);

    console.log("UserData", userData);
    if(!bio && !xlink && !discordUsername && !personal) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  }

  const username = user?user.username:"imhuman1";
  async function currentUser() {
    axios.post(BASE_API + `getcurrentuser/${username}`,{username:username})
      .then(res=> {
        console.log("res", res);
        if (res.data.user) {
          if(res.data.user.bio && res.data.user.bio.length>150) {
            setBio(res.data.user.bio.slice(0,150));
          } 
          else 
          {
            !res.data.user ? setBio("") : res.data.user.bio ? setBio(res.data.user.bio) : setBio("");
          };
          res.data.user.x_link ? setXlink(res.data.user.x_link) : setXlink("");
          res.data.user.x_link ? setDiscordUsername(res.data.user.discordUsername) : setDiscordUsername("");
          res.data.user.x_link ? setPersonal(res.data.user.personal_website) : setPersonal("");
        }
      })
  }

  const user_id = user?user.username:"imhuman1";

  useEffect(() => {
    console.log("profile");
    currentUser();
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible') {
        // isVisible = true;
        setIsvisible(true);
        // Your app is now visible, you can perform any necessary actions here
        console.log('App is visible');
      } else {
        // isVisible = false;
        setIsvisible(false);
        // Your app is now hidden, you can perform any necessary actions here
        console.log('App is hidden');
      }
    });
  }, []);

  useEffect(() => {
    if( isVisible && isVerify) {
      setOpenRefreshModal(true);
      setOpenModal(false);
    }
  }, [isVisible]);

  return (
    <UpdateUserDataContext.Provider value={updateUserData}>
      <OtpContext.Provider value={otp}>
        <div className="pt-[20px] " style={{fontFamily: "Inter"}}>
          <div className="-z-20">
            <div className="px-4 pb-[115px] bg-white">
              <div className="border rounded-lg border-[#D3D3D3] px-4 py-4">
                <h1 className="font-[600] text-[20px] leading-[24.2px]">Edit your profile</h1>
                <div className="flex items-center pt-3">
                  <div className="w-6 h-6 bg-black rounded-md p-[1px]">
                    <img className="w-[24px]" src={SmallSpaceImg} alt="logo"/>
                  </div>
                  <span className="font-[400] text-[16px] leading-[19.36px] mx-2 my-2">{user?.username}</span>
                </div>
                <div>
                  <label className="text-[16px] leading-[19.36px] font-[400]">Personal bio</label>
                  <textarea className="w-full h-[180px] border border-[#D3D3D3] rounded-md p-3 hover:outline-black outline-1 break-all" placeholder="Write a short intro about yourselef" rows={10} value={bio} maxLength={150} onChange={handleChange}/>
                  <span className="opacity-[60%] text-[14px]">{bio.length}/{characterLimit} characters</span>
                </div>
                <div className="my-[25px]">
                  <label className="text-[16px] leading-[19.36px] font-[400]" >X link</label>
                  <input className="w-full h-[56px] border border-[#D3D3D3] rounded-[8px] p-2 placeholder:text-[16px] leading-[19.36px] font-[400] hover:outline-black outline-1" placeholder="Enter your X profile link" value={xlink} onChange={XhandleChange}/>
                  {!isXvalid?<p className="text-red-500 text-xs">Type X link correctly</p>:""}
                </div>
                <div className="my-[25px]">
                  <label className="text-[16px] leading-[19.36px] font-[400]" >Discord username</label>
                  <input className="w-full h-[56px] border border-[#D3D3D3] rounded-[8px] p-2 placeholder:text-[16px] leading-[19.36px] font-[400] hover:outline-black outline-1" placeholder="Enter your Discord name" value={discordUsername} onChange={discordHandleChange}/>
                  {!discordValid?<p className="text-red-500 text-xs">Type Discord username correctly</p>:""}
                </div>
                <div className="my-[25px]">
                  <label className="text-[16px] leading-[19.36px] font-[400]">Personal website link</label>
                  <input className="w-full h-[56px] border border-[#D3D3D3] rounded-[8px] p-2 placeholder:text-[16px] leading-[19.36px] font-[400] hover:outline-black outline-1" placeholder="Enter your website" value={personal} onChange={personalHandleChange}/>
                  {!personalValid?<p className="text-red-500 text-xs">Type personal website link correctly</p>:""}
                </div>
                <Button background={true} disabled={false} text="Verify to save edits" onClick={()=>verify()}/>
              </div>
            </div>
            {openModal&&<VerifyModal1 close={()=>{setOpenModal(false)}}/>}
            {openRefreshModal &&  <RefreshModal1 close={()=>{setOpenRefreshModal(false)}}/>}
          </div>
          <div className="fixed bottom-0 w-full z-10">
            <Footer/>
          </div>
        </div>
      </OtpContext.Provider>
    </UpdateUserDataContext.Provider>
  )
}
