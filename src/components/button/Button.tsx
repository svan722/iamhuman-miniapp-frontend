
interface ButtonProps {
  background: boolean,
  text: string,
  onClick?: () => void
}

export default function Button(props: ButtonProps) {
  return (
    <div className="flex justify-center">

      <button className={`w-[264px] h-[40px] ${props.background?"bg-[#000] text-white": "bg-[#fff] text-black border rounded-lg"} mt-4 py-2 px-4 rounded-[36px] `} onClick={props.onClick}>{props.text}</button>
    </div>
  )
}
