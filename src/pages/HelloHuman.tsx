import { useState, useContext, useEffect } from "react";
import HumanIdLogo from "../assets/images/HumanId_logo.png";
import SmallSpaceImg from "../assets/images/small_space.png";
import ArrowRight from "../assets/images/arrow-right.png";
import { IoIosArrowForward } from "react-icons/io";
import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";
// import { useTelegram } from "../context/TelegramProvider";
import { useNavigate } from 'react-router-dom';
import { OtpContext } from "../../src/App";
import axios from "axios";
import { BASE_API, LIMIT_ACNT } from "../config/config";
import LimitModal from "../components/LimitModal";
import { setLimitAcntVal } from "../actions/UserAction";
import { useAppDispatch } from "../app/hooks";

export default function HelloHuman() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username } = useContext(OtpContext);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowPendingView, setIsShowPendingView] = useState(false);
  const [appName, setAppName] = useState('');
  const [nftId, setNftId] = useState('');
  const [nftImage, setNftImage] = useState('');

  async function currentUser() {
    axios.post(BASE_API + `getcurrentuser/${username}`,{username:username})
      .then(res=> {
        console.log("res current user", res);
      if (res.data.user) {
        setAppName(res.data.user.user_name);
        setNftId(res.data.user.nft_id);
        setNftImage(res.data.user.nft_image_uri);
      }
    })
  }

  useEffect(() => {
    currentUser();
    console.log(username, '>>>username hellohuman')
    async function getPendingProfile() {
      await axios.get(BASE_API + `edit/getpendingprofile/${username}`)
        .then((res)=> {
          console.log("res", res);
        if (res.data.code === 404) {
          setIsShowPendingView(false);
        } else {
          setIsShowPendingView(true);
        }
      })
    }
    getPendingProfile();
  }, []);

  const hideModal = () => {
    setIsShowModal(false);
  }

  const clickGotit = () => {
    setIsShowModal(false);
  }

  const editProfile = async() => {
    await axios
    .delete(BASE_API + `edit/delete/opt/${username}`)
    .then((res) => {
      console.log(res.data.code, '<<<delete resp code')
      navigate("/editprofile");
    })
    .catch((err) => {
      console.log("OTP delete failed", err);
    });
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
    <div className="pt-[30px] " style={{ fontFamily: "Inter" }}>
      <div className="px-8 pb-[90px]">
        <div className="text-center">
          <p className="font-[600] text-[32px] leading-[38.73px] mt-[-10px]">Hello human!</p>
          <p className="font-[400] text-[16px] leading-[22px] px-6">Explore your ImHuman NFTs and rewards in ImHuman App </p>
        </div>
        <div className="flex justify-center my-[20px]">
          <img src={nftImage} alt="Hello Human logo" className="w-[160px]" />
        </div>
        <div className="flex justify-center items-center">
          <img className="w-[24px]" src={HumanIdLogo} alt="Human logo" />
          <span className="font-[700] text-[16px] leading-[19.36px] ml-[5px]">#{nftId}</span>
        </div>
        <div className="w-full cursor-pointer rounded-lg bg-[#F5F5F5] px-5 py-3 flex justify-between items-center mt-4" onClick={() => navigate('/viewprofile')}>
          <div className="w-8 h-8 bg-black rounded-md flex justify-center items-center">
            <img className="w-[32px]" src={SmallSpaceImg} alt="logo" />
          </div>
          <div className="font-[400] text-[16px] leading-[19.36px] ml-[-50px]">
            <p className="opacity-[60%]">ImHuman account</p>
            <p>{appName}</p>
          </div>
          <img src={ArrowRight} alt="arrow right" />
        </div>
        {isShowPendingView && <div className="rounded-[8px] p-[10px] mt-[20px]" style={{ background: "linear-gradient(90deg, white 50%, #6486FF)" }}>
          <div className="text-[16px] font-[600] leading-[19.36px] mb-[10px]">You have pending profile edits</div>
          <div className="text-[12px] font-[400] leading-[14.52px]">Your edits will be saved once you have verified your Human Likeness. You can retrieve verification result if you have already done so.</div>
          <div className="flex justify-end items-center mt-[10px]" onClick={() => { navigate('/pendingprofile') }}>
            <div className="text-[16px] font-[600] leading-[19.36px]">View</div>
            <IoIosArrowForward className="text-[23px] ml-[5px]" />
          </div>
        </div>}
        {!isShowPendingView && <Button background={true} disabled={false} text="Edit my profile" onClick={() => editProfile()} />}
        <div className="border border-[#D3D3D3] p-[16px] gap-[8px] rounded-[8px] my-[20px]">
          <div className="text-[16px] font-[600] leading-[19.36px] mb-[10px]">Link a new ImHuman account</div>
          <div className="text-[16px] font-[400] leading-[19.36px]">You can link only one ImHuman account at a time. To relink, you'll need to verify your human likeness again.</div>
          <div className="flex justify-end items-center mt-[10px]" onClick={() => { getLimitAcnt() }}>
            <div className="text-[16px] font-[600] leading-[19.36px]">Relink</div>
            <IoIosArrowForward className="text-[23px] ml-[5px]" />
          </div>
        </div>
      </div>
      {isShowModal && <LimitModal gotit={clickGotit} close={hideModal} />}
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  )
}
