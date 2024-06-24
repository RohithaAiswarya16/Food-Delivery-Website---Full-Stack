import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
const LoginPopup = ({setShowLogin}) => {
  const {url,setToken} = useContext(StoreContext)
  const onLogin = async (event) =>{
      event.preventDefault()
      let newurl = url;
      if(currState==="Login"){
        newurl += "/api/user/login"
      }
      else{
        newurl += "/api/user/register"
      }

      const response = await axios.post(newurl,data);

      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
      }
      else{
        alert(response.data.message)
      }
    }

  

  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChnageHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  

  useEffect(()=>{
    console.log(data);
  },[data])
    const [currState, setCurrState] = useState("Sign Up")
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>{setShowLogin(false)}} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currState==="Login"?<></>:<input name='name' onChange={onChnageHandler} value={data.name} type="text" placeholder='Your Name' required />}
            
            <input name='email' onChange={onChnageHandler} value={data.email} type="email" placeholder='Your Email' required />
            <input name='password' onChange={onChnageHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type="submit">{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By Continuing, I agree to the terms of use and privacy policy</p>

        </div>
        {currState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
        :<p>Already have an acount? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup
