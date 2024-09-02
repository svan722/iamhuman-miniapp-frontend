import PremiumImg from "../assets/images/premium_brand_logo.png";
import CheckImg from "../assets/images/check.png";
import Footer from "../components/footer/Footer";

export default function UpcomingFeatures() {
  return (
    <div className="">
      <div className="flex flex-col h-[460px] items-center m-[20px] p-[20px] border border-[#D3D3D3] rounded-[8px]" style={{fontFamily: "Inter"}}>
        <div className="text-[20px] font-[600] leading-[24.2px] mb-[20px]">Upcoming Features</div>
        <div className="text-[16px] font-[400] leading-[19.36px]">PrivaseaBot will soon support both group and individual human likeness verifications.</div>
        <img src={PremiumImg} alt="premium brand logo" className="w-[200px] h-[182px] my-[20px]" />
        <div className="">
          <div className="flex items-center">
            <img src={CheckImg} alt="check image" className="w-[24px] h-[24px] mr-[10px]" />
            <div className="text-[16px] font-[400] leading-[19.36px]">Initiate Group Verification</div>
          </div>
          <div className="flex items-center mt-[10px]">
            <img src={CheckImg} alt="check image" className="w-[24px] h-[24px] mr-[10px]" />
            <div className="text-[16px] font-[400] leading-[19.36px]">Provide Individual Verification</div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  )
}
