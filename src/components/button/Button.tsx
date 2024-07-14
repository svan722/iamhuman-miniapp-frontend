
interface ButtonProps {
  background: boolean,
  text: string,
  onClick?: () => void
}

export default function Button(props: ButtonProps) {
  return (
    <div className="flex justify-center">
      <button className={`w-full h-[40px] rounded-[36px] ${props.background?"bg-[#000] text-white": "bg-[#fff] text-black border"} mt-4 py-2 px-4`} onClick={props.onClick}>{props.text}</button>
    </div>
  )
}
