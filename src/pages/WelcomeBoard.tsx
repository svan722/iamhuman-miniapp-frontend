import { useState, useEffect, createContext } from "react";
import BoxIllustraionImg from "../assets/images/box_illustration.png";
import Shape from "../assets/images/shape.png";
import Button from "../components/button/Button";
import VerifyModal from "../components/verify/VerifyModal";
import RefreshModal from "../components/refresh/RefreshModal";
import axios from "axios";
import {BASE_API} from "../config/config";
import { useTelegram } from "../context/TelegramProvider";
import { useNavigate } from "react-router-dom";

export const OtpContext = createContext<string>("");

export default function WelcomeBoard() {
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [openRefreshModal, setOpenRefreshModal] = useState(false);
  const [userId, setUserId] = useState("user123");
  const [nft, setNFT] = useState("")
  const [otp, setOtp] = useState("00000000");

  const navigate = useNavigate();
  const { user } = useTelegram(); 

  useEffect(() => {
    const username = user?user.username:"user123";
    async function currentUser() {
      axios.post(BASE_API + `getcurrentuser/${username}`,{username:username})
        .then(res=> {
          console.log("CURRENT USER", res);
          if(res.data.user_id)  navigate("/hellohuman");
          else if(res.data.code === 404){
            axios.get(BASE_API + `getuserinotp/${username}`)
              .then(res=> {
                console.log("GET USER IN OTP >>>", res);
                if(res.data.user) {
                  if(res.data.user.user_id)  setOpenRefreshModal(true);
                }
              })
              .catch(err=> {
                console.log("GET USER IN OTP ERR", err);
              })
          }
        })
    }

    currentUser();
  }, []);

  const linkApp = async () => {
    let user_id = user?.username;
    if(user_id)  setUserId(user_id);

    await axios.post(BASE_API+"getnft",{data:user_id} )
      .then(res=> {
        if(res.data.nft === undefined) setNFT("");
        else setNFT(res.data.nft);
      })
    const userData =  {
      user_id: userId, 
      nft_link:nft
    }

    await axios.post(BASE_API+"signin",
      userData, {
        headers: {
           'Access-Control-Allow-Origin': '*',
           'Content-Type': 'application/json'
        } 
     },
      )
    .then((res) => {
      if(res.data.msg === "otp") {
        setOtp(res.data.otp);
        setOpenVerifyModal(true);
      } else {
        if(!res.data.userData.nft_link) {
          setOpenVerifyModal(false);
        } else {
          navigate("/verifysuccess");
        }
      }
    })
  }

  return (
    <OtpContext.Provider value={otp}>
    <div className="py-[10px] w-full h-full bg-[url('/assets/images/bg.png')] bg-no-repeat bg-center bg-cover relative overflow-hidden" style={{fontFamily: "Inter"}}>
      {/* <Header isDark={false}/> */}
      <div className="px-4 py-1">
        <div className="p-4 rounded-lg bg-white border-[#D3D3D3] border">
          <div>
            <h2 className="text-[40px] font-[600] leading-[48.41px]">Welcome to PrivaseaBot</h2>
            <p className="text-[16px] font-[400] leading-[22px]">Verify your human liveness, edit personal information, and verify your group members' liveness on Telegram.</p>
          </div>
          <div className="mb-[10px]">
            <div className="flex justify-center">
              <img className="mt-[10px] w-[176px]" src={BoxIllustraionImg} alt="Box"/>  
            </div>
            <div className="flex items-center justify-center">
              <p className="text-[14px] font-[400] leading-[22px]">Powered by</p>
              <img className="w-[12.35px] h-[15.17px]" src={Shape}/>
              <p className="font-[noto] text-[8px] tracking-[0.2rem] text-[#162749] ml-1">PRIVASEA</p>
            </div>
          </div>
          <div className="py-3 px-5 border border-[#D3D3D3] rounded-lg">
            <p className="font-[600] text-[20px] leading-[24.2px] text-center">Set up with ImHuman App</p>
            <Button background={true} disabled={false} text="Link ImHuman APP" onClick={()=>linkApp()}/>
          </div>
        </div>
      </div> 
      {openVerifyModal && <VerifyModal close={()=>{setOpenVerifyModal(false)}}/>}
      {openRefreshModal && <RefreshModal close={()=>{setOpenRefreshModal(false)}}/>}
    </div>
    </OtpContext.Provider>
  )
}
