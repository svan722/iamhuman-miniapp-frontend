import Bg_button from "../../assets/images/button_bg.png";

interface ButtonProps {
  background: boolean,
  disabled: boolean,
  text: string,
  onClick?: () => void
}

export default function Button(props: ButtonProps) {
  return (
    <div className="flex justify-center relative mt-4 cursor-pointer" onClick={props.onClick} style={{fontFamily: "Inter"}}>
      <img className="z-2 absolute" src={Bg_button} />
      <button className={`w-full h-[40px] text-[16px] font-[500] leading-[19.36px] z-1 rounded-[36px] ${props.background? props.disabled? "" : "hover:bg-[#000]" : props.disabled? "" : "hover:bg-['transparent']"} ${props.background? props.disabled? "bg-[#D3D3D3] text-white opacity-70" : "bg-[#2D2D2D] text-white" : props.disabled? "bg-[#fff] text-black border opacity-70": "bg-[#fff] text-black border"} py-2 px-4`}>{props.text}</button>
    </div>
  )
}
