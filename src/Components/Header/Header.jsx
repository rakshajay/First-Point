import React from 'react';
import './Header.scss';
import logo from "../../assets/Logo/Array.png"


const Header = () => {
  return (
    <div className='header'>
        <img src={logo} alt="logo of Array"/>
    </div>
  )
}

export default Header