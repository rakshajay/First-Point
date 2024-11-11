import React from 'react';
import './Header.scss';
import logo from "../../assets/Logo/Array.png"
import { Link } from "react-router-dom"


const Header = () => {
  return (
    <div className='header'>
        <Link to="/"><img src={logo} alt="logo of Array"/></Link>
    </div>
  )
}

export default Header