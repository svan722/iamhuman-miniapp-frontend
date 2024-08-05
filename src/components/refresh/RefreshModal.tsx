// import { useState, useEffect, useContext } from "react";
import NeverNodeImg from "../../assets/images/nerve_node.png";
import Button from "../button/Button";

interface RefreshModalProps {
  close?: () => void
}

export default function RefreshModal(props: RefreshModalProps) {
  const onclickRefresh = () => {
    props.close;
  }

  return ( 
    <div className={`w-full h-full p-[30px] absolute bottom-[-40%] block rounded-lg bg-white border-[#D3D3D3] border modal-anim-slideIn`} style={{fontFamily: "Inter"}}>
      <div className="flex flex-col items-center p-[10px]">
        <img className="rounded-[50%] w-[56px] h-[56px] mb-[10px]" src={NeverNodeImg} alt="close" onClick={props.close}/>
        <div className="text-[20px] font-[600] leading-[24.2px] mb-[10px]">Welcome back, human!</div>
        <div className="text-[16px] font-[400] leading-[22px] text-center">Refresh the PrivaseaBot page to update your verification results in the bot.</div>
      </div>
      <Button background={true} disabled={false} text="Refresh" onClick={()=>{onclickRefresh()}}/>
      <Button background={false} disabled={false} text="Cancel" onClick={props.close}/>
    </div>
  )
}
