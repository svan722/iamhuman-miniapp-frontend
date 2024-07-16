import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header'

export default function Payment() {
const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(() => {
    navigate("/account_upgraded");      
    }, 3000);
    return ()=> {}
  },[]);

  return (
    <div>
      <Header isDark={true}/>
      <p className='font-normal text-base text-center mt-24'>This ui will depend on what<br/> payment method we use</p>
    </div>
  )
}
