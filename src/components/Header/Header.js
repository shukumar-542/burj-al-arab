import React from 'react';
import logo from '../../images/icons/logo.png';
import header from '../../images/header.png'
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
      return (
            <div style={{backgroundImage : `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})`}} className='header'>
                  <nav className='nav'>
                        <ul>
                              <li>
                                    <img className='logo' src={logo} alt="" srcset="" />
                              </li>
                              <li><Link to='/home'>Home</Link></li>
                              <li><Link to='/login'>Login</Link></li>
                              <li><Link to='/book/:bedType'>Book</Link></li>
                        </ul>
                  </nav>
                  <div className='title-container'>
                        <h1>Burj AL Arab</h1>
                        <h2>A Global Icon Of Arabian Luxury</h2>
                  </div>
            </div>
      );
};

export default Header;