import { useState, createContext, useEffect } from "react";
import axios from "axios";
import SmallSpaceImg from "../assets/images/small_space.png";
import PencilImg from "../assets/images/pencil.png";
import LinkImg from "../assets/images/link.png";
import { IoSearchSharp } from "react-icons/io5";
import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";
import VerifyModal1 from "../components/verify/VerifyModal1";
import { useTelegram } from "../context/TelegramProvider";
import { useNavigate } from 'react-router-dom';
import { validateDiscordUsername, validateURL, validateTwitterUrl } from "../utils/validate";
import { BASE_API } from "../config/config";

interface IUpdateUserData {
  xlink?: String,
  discordUsername?: String,
  personalWeb?: String
}
export const UpdateUserDataContext = createContext<IUpdateUserData>({});

export default function ViewProfile() {
  const { user } = useTelegram();
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [xlink, setXlink] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [personal, setPersonal] = useState("")
  const [openModal, setOpenModal] = useState(false);
  const [characterLimit] = useState(150);
  const [isXvalid, setIsXvalid] = useState(true);
  const [discordValid, setDiscordValid] = useState(true);
  const [personalValid, setPersonalValid] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [isShowClearBtn, setIsShowClearBtn] = useState(false);
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

  const onchangeSearchTxt = (e:any) => {
    setSearchName(e.target.value);
    if (e.target.value !== null) {
      setIsShowClearBtn(true);
    } else {
      setIsShowClearBtn(false);
    }
  }

  const linkSocial = (linkVal:any) => {
    window.open(linkVal);
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
            <div className="border rounded-lg border-[#D3D3D3] px-4 py-4 mb-[20px]">
              <div className="text-[20px] leading-[24.2px] font-[600] mb-[25px]">Search Profiles</div>
              <div className="bg-[F5F5F5] opacity-[50%] rounded-lg">
                <div className="w-full h-[56px] flex items-center bg-[#F5F5F5] rounded-[8px] p-2 placeholder:text-[16px] leading-[19.36px] font-[400] hover:outline-black outline-1 px-[20px]">
                  <div className="flex items-center">
                    <IoSearchSharp className="text-[20px]" />
                    <input className="border-none ml-[10px] bg-[#F5F5F5] outline-none" value={searchName} onChange={(e) => {onchangeSearchTxt(e)}} placeholder="Search with user name" />
                  </div>
                  {isShowClearBtn && <div className="font-[400] text-[16px] leading-[22px] mt-[3px] cursor-pointer" onClick={() => {setSearchName('');setIsShowClearBtn(false);}}>Clear</div>}
                </div>
              </div>
            </div>
            <div className="border rounded-lg border-[#D3D3D3] px-4 py-4">
              <div className="flex items-center justify-between">
                <h1 className="font-[600] text-[20px] leading-[24.2px]">My profile</h1>
                <img src={PencilImg} className="cursor-pointer w-[10.9px] h-[10.9px]" alt="pencil" onClick={() => {navigate('/editprofile')}}/>
              </div>
              <div className="flex items-center rounded-lg bg-[#F5F5F5] p-[20px] my-[20px]">
                <div className="w-[32px] h-[32px] bg-black rounded-md p-[3px] mr-[10px]">
                  <img className="" src={SmallSpaceImg} alt="logo"/>
                </div>
                <div>
                  <div className="text-[16px] font-[400] leading-[19.36px] text-black opacity-[60%] ">ImHuman account</div>
                  <span className="text-[16px] font-[400] leading-[19.36px] text-black">{user?.username}</span>
                </div>
              </div>
              <div>
                <label className="text-[16px] leading-[19.36px] font-[500]">Personal bio</label>
                <div className="text-[14px] font-[400] leading-[16.94px]">The WorkHeart NFT ensures that nodes are live and maintained by humans, providing seamless FHE AI services. Currently, the WorkHeart Combo is available for reservation with a fee of 0.015 ETH, applied towards the total payment.</div>
              </div>
              <div className="my-[25px]">
                <label className="text-[16px] leading-[19.36px] font-[500]" >X link</label>
                <div className="flex items-center cursor-pointer" onClick={() => {linkSocial('https://x.com/yunan_minami')}}>
                  <img src={LinkImg} className="w-[20px] h-[20px] mr-[5px]" alt="link" />
                  <div className="">https://x.com/yunan_minami</div>
                </div>
              </div>
              <div className="my-[25px]">
                <label className="text-[16px] leading-[19.36px] font-[500]" >Discord username</label>
                <div className="flex items-center cursor-pointer" onClick={() => {linkSocial('https://discord.gg/yunan_minami')}}>
                  <img src={LinkImg} className="w-[20px] h-[20px] mr-[5px]" alt="link" />
                  <div className="">@102020</div>
                </div>
              </div>
              <div className="">
                <label className="text-[16px] leading-[19.36px] font-[500]">Personal website link</label>
                <div className="flex items-center cursor-pointer" onClick={() => {linkSocial('https://www.privasea.ai')}}>
                  <img src={LinkImg} className="w-[20px] h-[20px] mr-[5px]" alt="link" />
                  <div className="">www.privasea.ai</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 w-full z-10">
          <Footer/>
        </div>
      </div>
    </UpdateUserDataContext.Provider>
  )
}
