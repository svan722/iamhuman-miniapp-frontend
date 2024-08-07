interface SearchProfileViewProps {
  user?: any,
  viewProfile?: () => void
}

export default function SearchProfileView(props:SearchProfileViewProps) {
  return (
    <div  className="flex justify-between">
      <div className="hover:cursor-pointer hover:bg-[#F5F5F5] py-[9px] px-[16px] text-[14px] leading-[16.94px] font-normal">{props.user} </div>
      <div className="py-[9px] px-[16px] text-[12px] font-[600] text-right leading-[14.52px] text-black hover:cursor-pointer" onClick={props.viewProfile}>View Profile</div>
    </div>

  )
}
