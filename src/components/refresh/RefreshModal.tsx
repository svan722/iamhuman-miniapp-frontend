import { useEffect } from "react";
import NeverNodeImg from "../../assets/images/nerve_node.png";
import Button from "../button/Button";
// import axios from "axios";
// import { BASE_API } from "../../config/config";
// import { OtpContext } from "../../pages/WelcomeBoard";
// import { useNavigate } from "react-router-dom";
// import { useTelegram } from "../../context/TelegramProvider";

export default function RefreshModal() {

  // const [otp, setOtp] = useState<string>("");
  // const  navigate = useNavigate();
  
  // const context = useContext(OtpContext);
  // const { user } = useTelegram(); 

  useEffect(() => {
    // setOtp(context);
  
    return () => { };
  }, []);

  const onclickRefresh = async () => {
    // console.log("otpToken", context);
    // const otpToken = context.split("-")[0] + "-" + context.split("-")[1];
    // await axios.post(BASE_API+`get/tgbot/verification/link/${otpToken}`, {user_id:user?user.username:"imhuman1"})
      // .then(res=>{
      //   console.log("verification",res);
      //   if(res.data.msg === "ok" && res.data.code === 200) {
      //     navigate("/verifysuccess");
      //   }
      // })
  }

    const handleCancel = async () => {
      // await axios.delete(BASE_API + `delete/opt/${otp}`)
      //   .then((res) => {
      //     console.log("handle cancel", res)
      //     props.close()
      //   }).catch(err=> {
      //     console.log("OTP delete failed", err)
      //   })
    }
    
  return ( 
    <div className={`w-full h-full p-[30px] absolute bottom-[-40%] block rounded-lg bg-white border-[#D3D3D3] border modal-anim-slideIn`} style={{fontFamily: "Inter"}}>
      <div className="flex flex-col items-center p-[10px]">
        <img className="rounded-[50%] w-[56px] h-[56px] mb-[10px]" src={NeverNodeImg} alt="close" onClick={handleCancel}/>
        <div className="text-[20px] font-[600] leading-[24.2px] mb-[10px]">Welcome back, human!</div>
        <div className="text-[16px] font-[400] leading-[22px] text-center">Refresh the PrivaseaBot page to update your verification results in the bot.</div>
      </div>
      <Button background={true} disabled={false} text="Refresh" onClick={()=>{onclickRefresh()}}/>
      <Button background={false} disabled={false} text="Cancel" onClick={handleCancel}/>
    </div>
  )
}
