import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import SmallSpaceImg from "../assets/images/small_space.png";
import UnverifiedUserImg from "../assets/images/unverifieduser.png";
import NFTLogo from "../assets/images/nftlogo.png";
import PencilImg from "../assets/images/pencil.png";
import LinkImg from "../assets/images/link.png";
import { IoSearchSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import Footer from "../components/footer/Footer";
// import { useTelegram } from "../context/TelegramProvider";
import { OtpContext } from "../../src/App";
import { useNavigate } from 'react-router-dom';
import { BASE_API, LIMIT_ACNT } from "../config/config";
import SearchProfileView from "../components/searchComponents/SearchProfileView";
import LimitModal from "../components/LimitModal";
import { useAppDispatch } from "../app/hooks";
import { setLimitAcntVal } from "../actions/UserAction";

interface IUpdateUserData {
  xlink?: String,
  discordUsername?: String,
  personalWeb?: String
}
export const UpdateUserDataContext = createContext<IUpdateUserData>({});

export default function ViewProfile() {
  // const { user } = useTelegram();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username } = useContext(OtpContext);
  const [bio, setBio] = useState("");
  const [xlink, setXlink] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [personal, setPersonal] = useState("")
  const [searchName, setSearchName] = useState("");
  const [isShowClearBtn, setIsShowClearBtn] = useState(false);
  const [userItems, setuserItems] = useState([]);
  const [updateUserData]  = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const [userid, setUserid] = useState(username);
  const [nftid, setNftid] = useState('');
  const [nftImage, setNftImage] = useState('');
  const [appName, setAppName] = useState('');
  const [isUnverifiedUser, setIsUnverifiedUser] = useState(false);

  const onchangeSearchTxt = (e:any) => {
    setSearchName(e.target.value);
    console.log(e.target.value, e.target.value === null, e.target.value === "")
    if (e.target.value === null || e.target.value === "") {
      setIsShowClearBtn(false);
      setuserItems([]);
      setIsUnverifiedUser(false);
    } else {
      console.log('false')
      setIsShowClearBtn(true);
    }
  }

  const linkSocial = (linkVal:any) => {
    if (!linkVal)
      return;
    window.open(linkVal);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API}searchprofile?user_id=${searchName}`);
        setuserItems(response.data.data);
        if (response.data.data.length === 0 && searchName !== "") {
          setIsUnverifiedUser(true);
        } else {
          setIsUnverifiedUser(false);
        }
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
    // const username = user?.username;
    async function currentUser() {
      axios.post(BASE_API + `getcurrentuser/${username}`,{username:username})
        .then(res=> {
          console.log("res", res);
        if (res.data.user) {
          setAppName(res.data.user.user_name);
          if(res.data.user.bio && res.data.user.bio.length>150) {
            setBio(res.data.user.bio.slice(0,150));
          } 
          else 
          {
            !res.data.user ? setBio("") : res.data.user.bio ? setBio(res.data.user.bio) : setBio("");
          };
          res.data.user.x_link ? setXlink(res.data.user.x_link) : setXlink("");
          res.data.user.discordUsername ? setDiscordUsername(res.data.user.discordUsername) : setDiscordUsername("");
          res.data.user.personal_website ? setPersonal(res.data.user.personal_website) : setPersonal("");
          setNftImage(res.data.user.nft_image_uri);
          setNftid(res.data.user.nft_id);
          setAppName(res.data.user.user_name);
        }
      })
    }
    currentUser();
  }, []);

  const viewProfile = (username:any) => {
    async function currentUser() {
      axios.post(BASE_API + `getcurrentuser/${username}`,{username:username})
        .then(res=> {
          console.log("res view profile", res);
          setAppName(res.data.user.user_name);
          setUserid(res.data.user.user_id);
          setNftid(res.data.user.nft_id);
          setNftImage(res.data.user.nft_image_uri);
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

  const hideModal = () => {
    setIsShowModal(false);
  }

  const clickGotit = () => {
    setIsShowModal(false);
  }

  const getLimitAcnt = async() => {
    console.log('username>>>>>', username);
    await axios
      .get(BASE_API + `getlimitacnt/${username}`)
      .then((res) => {
        console.log(res.data, '<<<getlimitacnt');
        dispatch(setLimitAcntVal(res.data.user.limit_acnt+1));
        if(res.data.code === 200) {
          if(res.data.user.limit_acnt < LIMIT_ACNT) {
            axios
            .delete(BASE_API + `delete/user/${username}`)
            .then((res) => {
              console.log("handle cancel", res);
              navigate("/linkverify");
            })
            .catch((err) => {
              console.log("OTP delete failed", err);
            });
          } else {
            setIsShowModal(true);
          }
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                  {isShowClearBtn && <div className="font-[400] text-[16px] leading-[22px] mt-[3px] cursor-pointer" onClick={() => {setSearchName('');setIsShowClearBtn(false);setIsUnverifiedUser(false);}}>Clear</div>}
                </div>
                <div className=" w-full mt-[5px]">
                  {
                    userItems.map((data:any, index:any) => {
                      return <SearchProfileView key={index} user={data.user_id} viewProfile={()=>viewProfile(data.user_id)}/>
                    })
                  }
                </div>
                {isUnverifiedUser && <div className="bg-[#F5F5F5] rounded-lg flex flex-col items-center p-[10px] mt-[20px]">
                  <img src={UnverifiedUserImg} alt="unverified user" className="w-[70px] h-[70px] rounded-[50%]" />
                  <div className="text-[16px] font-[600] leading-[22px] text-center mt-[20px]">Unverified user</div>
                  <div className="text-[16px] font-[400] leading-[22px] mt-[10px]">Oops! This user hasn't linked an ImHuman account yet.</div>
                </div>}
              </div>
            </div>
            {!isUnverifiedUser && <div className={`border rounded-lg ${username === userid ? 'border-[#D3D3D3]' : 'border-none'} px-4 py-4 mb-[20px] ${username === userid ? '' : 'bg-[#F5F5F5]'}`}>
              {username === userid && <div className="flex items-center justify-between">
                <h1 className="font-[600] text-[20px] leading-[24.2px]">My profile</h1>
                <img src={PencilImg} className="cursor-pointer w-[10.9px] h-[10.9px]" alt="pencil" onClick={() => {navigate('/editprofile')}}/>
              </div>}
              <div className="flex items-center rounded-lg bg-[#F5F5F5] p-[20px] my-[20px]">
                <div className="w-[32px] h-[32px] bg-black rounded-md p-[3px] mr-[10px]">
                  <img className="" src={SmallSpaceImg} alt="logo"/>
                </div>
                <div>
                  <div className="text-[16px] font-[400] leading-[19.36px] text-black opacity-[60%] ">ImHuman account</div>
                  <span className="text-[16px] font-[400] leading-[19.36px] text-black">{appName}</span>
                </div>
              </div>
              <div className={`${username === userid ? 'bg-[#F5F5F5]' : 'bg-[#FFFFFF]'} rounded-[8px] p-[10px] flex flex-col items-center mb-[10px]`}>
                <img src={nftImage} alt="nft image" className="rounded-[50%] w-[48px] h-[48px]" />
                <div className="text-[16px] font-[500] leading-[19.36px] mt-[10px]">{appName}'s ImHuman NFT</div>
                <div className="flex justify-center items-center mt-[5px]">
                  <img src={NFTLogo} alt="nft id logo" className="w-[20px] h-[20px]" />
                  <div className="text-[16px] font-[700] leading-[19.36px] ml-[5px]">#{nftid}</div>
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
                <div className="flex items-center cursor-pointer">
                  {/* <img src={LinkImg} className="w-[20px] h-[20px] mr-[5px]" alt="link" /> */}
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
            </div>}
            {!isUnverifiedUser && <div className="border rounded-lg border-[#D3D3D3] p-[15px]">
              <div className="text-[16px] leading-[19.36px] font-[600] mb-[10px]">Unlink ImHuman account</div>
              <div className="text-[16px] font-[400] leading-[19.36px]">We will remove the link and your profile completely. To unlink, you'll need to verify your human likeness again in the {" "}<span className="font-[600]">TG Bot Link</span> Portal in ImHuman.</div>
              <div className="flex justify-end items-center mt-[10px]" onClick={() => {getLimitAcnt()}}>
                <div className="text-[16px] font-[600] leading-[19.36px]">Unlink</div>
                <IoIosArrowForward className="text-[23px] ml-[5px]" />
              </div>
            </div>}
          </div>
        </div>
        {isShowModal && <LimitModal gotit={clickGotit} close={hideModal} />}
        <div className="fixed bottom-0 w-full z-10">
          <Footer/>
        </div>
      </div>
    </UpdateUserDataContext.Provider>
  )
}
