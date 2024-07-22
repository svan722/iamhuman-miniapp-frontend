import {useState, useEffect, useContext} from "react";
import closeSVG from "../../assets/images/bclose.svg";
import { useNavigate } from 'react-router-dom';
import Button from "../button/Button";
import axios from "axios";
import {BASE_API} from "../../config/config";
import { useTelegram } from "../../context/TelegramProvider";
import {UpdateUserDataContext} from "../../pages/Profile";

interface VerifyModal1Props {
  close?: () => void
}
export default function VerifyModal1(props: VerifyModal1Props) {
  const navigate = useNavigate();
  const [time, setTime] = useState(5);

  const {user} = useTelegram();
  const _updateUserData = useContext(UpdateUserDataContext);

  const updateUserData = async () => {
    const username = user?user.username:"default1234";
    try {
      await axios.put(BASE_API + `/update/:${username}`, {
        _updateUserData
      });
      // Handle success, e.g., show a success message
      console.log('User updated successfully');
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error updating user:', error);
    }
  }
  useEffect(() => {
    if (time === 0) {
        console.log("close");
        updateUserData();
        navigate("/verifysuccess");
      }
    }, [time]);

  // count down timer
  useEffect(() => {
  let timer = setInterval(() => {
    setTime((time) => {
      if (time === 0) {
        clearInterval(timer);
        return 0;
      } else return time - 1;
    });
  }, 1000);

  return () => {
    clearInterval(timer);
  };
  }, []);

  return (
    <>
    <div className="w-full h-full absolute bottom-[-230px] block rounded-lg bg-white border-[#D3D3D3] border z-10">

      <div className="px-8 py-5">
        <img className="float-end" src={closeSVG} alt="close" onClick={props.close}/>
        <p className="font-semibold text-[20px] text-center pt-8 leading-6">Verify your Human Likeness in ImHuman App with this code</p>
        <p className="font-normal text-base text-center pt-5">Paste your one-time passcode into your ImHuman Telegram Bot page by navigating to:</p>
        <p className="font-semibold text-base text-center leading-[22px]">{"Proof > Test your Liveness > TG Bot"}</p>
        <div className="grid grid-cols-4 gap-4 pt-4">
          <label className="w-[60px] h-[80px] rounded-lg bg-[#EAECF1] text-center text-2xl font-semibold py-5">7</label>
          <label className="w-[60px] h-[80px] rounded-lg bg-[#EAECF1] text-2xl font-semibold py-5 text-center">7</label>
          <label className="w-[60px] h-[80px] rounded-lg bg-[#EAECF1] text-2xl font-semibold py-5 text-center">7</label>
          <label className="w-[60px] h-[80px] rounded-lg bg-[#EAECF1] text-2xl font-semibold py-5 text-center">7</label>
        </div>
        <div className="text-center mt-4">
          <span >The code is valid for </span><span className="text-red-500">04:59</span>
        </div>
        <div className="py-2">
          <Button background={true} text="Copy code" onClick={()=>{navigate('/verifypassed')}}/>
          <Button background={false} text="Cancel" onClick={props.close}/>
        </div> 
      </div>
    </div>
    </>
  )
}
