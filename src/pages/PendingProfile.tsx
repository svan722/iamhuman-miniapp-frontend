import { useState, createContext, useContext, useEffect } from "react";
// import axios from "axios";
import LinkImg from "../assets/images/link.png";
import SmallSpaceImg from "../assets/images/small_space.png";
import Footer from "../components/footer/Footer";
import { OtpContext } from "../App";
import { useNavigate } from "react-router-dom";
// import { BASE_API } from "../config/config";
import Button from "../components/button/Button";
import { useAppDispatch } from "../app/hooks";
import { setEditVal } from "../actions/EditAction";
import { BASE_API } from "../config/config";
import axios from "axios";

interface IUpdateUserData {
  xlink?: String;
  discordUsername?: String;
  personalWeb?: String;
}
export const UpdateUserDataContext = createContext<IUpdateUserData>({});

export default function PendingProfile() {
  const navigate = useNavigate();
  const { username } = useContext(OtpContext);
  const dispatch = useAppDispatch();
  const [bio, setBio] = useState("");
  const [xlink, setXlink] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [personal, setPersonal] = useState("")
  const [updateUserData] = useState({});

  useEffect(() => {
    async function getPendingData() {
      axios.get(BASE_API + `edit/getpendingprofile/${username}`)
      .then(res => {
        console.log(res, '<<<pending profile');
        if (res.data.code === 404) {
          alert("Can't find pending profile!");
          return;
        }
        const editData = {
          user_id: res.data.profile.user_id,
          bio: res.data.profile.bio,
          x_link: res.data.profile.xlink,
          discordUsername: res.data.profile.discordUsername,
          personal_website: res.data.profile.personal,
        };    
        dispatch(setEditVal(editData));
        setBio(res.data.profile.bio);
        setXlink(res.data.profile.x_link);
        setDiscordUsername(res.data.profile.discordUsername);
        setPersonal(res.data.profile.personal_website);
      })
    }
    getPendingData();
  }, [])

  return (
    <UpdateUserDataContext.Provider value={updateUserData}>
      <div className="pt-[20px] " style={{ fontFamily: "Inter" }}>
        <div className="-z-20">
          <div className="px-4 pb-[115px] bg-white">
            <div className="rounded-[8px] border border-[#D3D3D3] p-[16px]">
              <h1 className="font-[600] text-[20px] leading-[24.2px] mb-[20px]">
                Pending profile edits
              </h1>
              <div className="text-[14px] font-[400] leading-[16.94px] my-[10px]">
                Your edits will be saved once you have verified your Human
                Likeness in the ImHuman App.{" "}
              </div>
              <div className="flex items-center my-[10px]">
                <div className="w-6 h-6 bg-black rounded-md p-[1px]">
                  <img className="w-[24px]" src={SmallSpaceImg} alt="logo" />
                </div>
                <span className="font-[400] text-[16px] leading-[19.36px] mx-2 my-2">
                  {username}
                </span>
              </div>
              <div className="bg-[#F5F5F5] rounded-[8px] p-[16px]">
                <div className="mb-[20px]">
                  <h1 className="font-[500] text-[14px] leading-[16.94px] mb-[10px]">
                    Personal bio
                  </h1>
                  <div className="text-[12px] font-[400] leading-[14.52px]">
                    {bio}
                  </div>
                </div>
                <div className="mb-[20px]">
                  <h1 className="font-[500] text-[14px] leading-[16.94px] mb-[5px]">
                    X link
                  </h1>
                  <div className="flex items-center">
                    <img
                      src={LinkImg}
                      className="w-[16px] h-[16px]"
                      alt="xlink"
                    />
                    <div className="text-[12px] font-[400] leading-[14.52px]">
                      {xlink}
                    </div>
                  </div>
                </div>
                <div className="mb-[20px]">
                  <h1 className="font-[500] text-[14px] leading-[16.94px] mb-[5px]">
                    Discord username
                  </h1>
                  <div className="text-[12px] font-[400] leading-[14.52px]">
                    {discordUsername}
                  </div>
                </div>
                <div className="">
                  <h1 className="font-[500] text-[14px] leading-[16.94px] mb-[5px]">
                    Personal website link
                  </h1>
                  <div className="flex items-center">
                    <img
                      src={LinkImg}
                      className="w-[16px] h-[16px]"
                      alt="websitelink"
                    />
                    <div className="text-[12px] font-[400] leading-[14.52px]">
                      {personal}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[10px]">
                <Button
                  background={true}
                  disabled={false}
                  text="View my verification"
                  onClick={() => {
                    navigate("/profileverify");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 w-full z-10">
          <Footer />
        </div>
      </div>
    </UpdateUserDataContext.Provider>
  );
}
