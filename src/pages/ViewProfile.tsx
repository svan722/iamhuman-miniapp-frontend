import { useState, createContext, useEffect } from "react";
import axios from "axios";
import SmallSpaceImg from "../assets/images/small_space.png";
import PencilImg from "../assets/images/pencil.png";
import LinkImg from "../assets/images/link.png";
import { IoSearchSharp } from "react-icons/io5";
import Footer from "../components/footer/Footer";
import { useTelegram } from "../context/TelegramProvider";
import { useNavigate } from 'react-router-dom';
import { BASE_API } from "../config/config";
import SearchProfileView from "../components/searchComponents/SearchProfileView";

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
  const [searchName, setSearchName] = useState("");
  const [isShowClearBtn, setIsShowClearBtn] = useState(false);
  const [userItems, setuserItems] = useState([]);
  const [updateUserData]  = useState({});
  

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
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API}searchprofile?user_id=${searchName}`);
        setuserItems(response.data.data);
        console.log("userdata>>>", userItems)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchName.trim() !== '') {
      fetchData();
    } else {
      setuserItems([]);
    }
  }, [searchName]);

  useEffect(() => {
    console.log("profile");
    const username = user?user.username:"user131";
    async function currentUser() {
      axios.post(BASE_API + `getcurrentuser/${username}`,{username:username})
        .then(res=> {
          console.log("res", res);
          setBio(res.data.user.bio);
          setXlink(res.data.user.x_link);
          setDiscordUsername(res.data.user.discordUsername);
          setPersonal(res.data.user.personal_website);

        })
    }
    currentUser();
  }, []);

  const viewProfile = (username:any) => {
    async function currentUser() {
      axios.post(BASE_API + `getcurrentuser/${username}`,{username:username})
        .then(res=> {
          console.log("res", res);
          setBio(res.data.user.bio);
          setXlink(res.data.user.x_link);
          setDiscordUsername(res.data.user.discordUsername);
          setPersonal(res.data.user.personal_website);

        })
    }
    currentUser();
    setSearchName('');
    setIsShowClearBtn(false);
  }
  return (
    <UpdateUserDataContext.Provider value={updateUserData}>
      <div className="pt-[20px] " style={{fontFamily: "Inter"}}>
        <div className="-z-20">
          <div className="px-4 pb-[115px] bg-white">
            <div className="border rounded-lg border-[#D3D3D3] px-4 py-4 mb-[20px]">
              <div className="text-[20px] leading-[24.2px] font-[600] mb-[25px]">Search Profiles</div>
              <div className="bg-[F5F5F5] rounded-lg">
                <div className="w-full h-[56px] flex items-center bg-[#F5F5F5] rounded-[8px] p-2 placeholder:text-[16px] leading-[19.36px] font-[400] hover:outline-black outline-1 px-[20px]">
                  <div className="flex items-center">
                    <IoSearchSharp className="text-[20px] text-[#00000099]" />
                    <input className="border-none ml-[10px] bg-[#F5F5F5] outline-none" value={searchName} onChange={(e) => {onchangeSearchTxt(e)}} placeholder="Search with user name" />
                  </div>
                  {isShowClearBtn && <div className="font-[400] text-[16px] leading-[22px] mt-[3px] cursor-pointer" onClick={() => {setSearchName('');setIsShowClearBtn(false);}}>Clear</div>}
                </div>
                <div className=" w-full">
                  {
                    userItems.map((data:any, index:any) => {
                      return <SearchProfileView key={index} user={data.user_id} viewProfile={()=>viewProfile(data.user_id)}/>
                    })
                  }
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
                <div className="text-[14px] font-[400] leading-[16.94px]">{bio}</div>
              </div>
              <div className="my-[25px]">
                <label className="text-[16px] leading-[19.36px] font-[500]" >X link</label>
                <div className="flex items-center cursor-pointer" onClick={() => {linkSocial(xlink)}}>
                  <img src={LinkImg} className="w-[20px] h-[20px] mr-[5px]" alt="link" />
                  <div className="">{xlink}</div>
                </div>
              </div>
              <div className="my-[25px]">
                <label className="text-[16px] leading-[19.36px] font-[500]" >Discord username</label>
                <div className="flex items-center cursor-pointer" onClick={() => {linkSocial(discordUsername)}}>
                  <img src={LinkImg} className="w-[20px] h-[20px] mr-[5px]" alt="link" />
                  <div className="">{discordUsername}</div>
                </div>
              </div>
              <div className="">
                <label className="text-[16px] leading-[19.36px] font-[500]">Personal website link</label>
                <div className="flex items-center cursor-pointer" onClick={() => {linkSocial(personal)}}>
                  <img src={LinkImg} className="w-[20px] h-[20px] mr-[5px]" alt="link" />
                  <div className="">{personal}</div>
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
