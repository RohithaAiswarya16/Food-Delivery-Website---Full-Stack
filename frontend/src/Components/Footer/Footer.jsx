import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, totam itaque incidunt assumenda nihil eligendi illo porro ad nulla nostrum.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
            
        </div>
        <div className="footer-content-right">
            <h2>
                Get in Touch
            </h2>
            <ul>
                <li>+91 7661057152</li>
                <li>tarun_vaka@srmap.edu.in</li>
            </ul>

        </div>
        
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ Tomato.com - All rights Reserved.
      </p>
    </div>
  )
}

export default Footer
