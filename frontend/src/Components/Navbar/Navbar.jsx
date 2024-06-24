import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
const Navbar = ({setShowLogin}) => {

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext)


    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }


    const [menu, setMenu] = useState("home")
  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className='navbar-menu'>
            <Link to='/' className={menu==='home'?"active" : ""} onClick={()=>setMenu("home")}>Home</Link>
            <a href='#exploremenu' className={menu==='menu'?"active" : ""} onClick={()=>setMenu("menu")}>Menu</a>
            <a href='#app-download' className={menu==='mobile-app'?"active" : ""} onClick={()=>setMenu("mobile-app")}>Mobile-App</a>
            <a href='#footer' className={menu==='contact'?"active" : ""} onClick={()=>setMenu("contact")}>Contact Us</a>
            
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" className="" />
            <div className="navbar-search-icon">
                <Link to={'/cart'}><img src={assets.basket_icon} alt="" className="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}>
            </div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>
            :<div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className="navbar-profile-dropdown">
                    <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
                </div>}
            
            
        </div>
    </div>
  )
}

export default Navbar
