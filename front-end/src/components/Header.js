import React from 'react';
import NavItem from './NavItem.js'; 
import '../css/Header.css'; 
import clapperboardImage from '../assets/clapperboard.jpeg'; 
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext.js';

const Header = () => {
  
  return (
    <header>
    <div className="top-menu">
        <img src={clapperboardImage} alt="Edit Profile Icon" className="clapperboardImage" />
        <Link to="/" className='pagename'>A6 Movie</Link>
        <div className='navitem'><NavItem  /></div>
      
    </div>
    </header>
  );
};

export default Header;
