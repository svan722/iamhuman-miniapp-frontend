interface SearchProfileViewProps {
  userList?: any
}

export default function SearchProfileView(props:SearchProfileViewProps) {
  return (
    <div className=" w-full">
      {
        props.userList.map((data:any, index:any) => {
          return <div key={index} className="hover:cursor-pointer hover:bg-[#F5F5F5] py-[9px] px-[16px]">{data.user_id} </div>
        })
      }
    </div>
  )
}
