import React from 'react';
import NavItem from './NavItem.js'; 
import '../css/Header.css'; 
import film from '../assets/film.png'; 
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext.js';

const Header = () => {
  
  return (
    <header style={{ backgroundColor: '#f5e9e6' }}>
    <div className="top-menu">
        
        <div className="title-container">
          <Link to="/" className='the'>The</Link>
          <Link to="/" className='pagename'>Seanema</Link>
        </div>
        <img src={film} alt="Edit Profile Icon" className="film" />
        <div className='navitem'><NavItem  /></div>
      
    </div>
    </header>
  );
};

export default Header;
