import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/NavItems.css'; 
import adminIcon from '../assets/admin-icon.jpg';
import edit from '../assets/edit.png'; 
import login from '../assets/lock.jpeg';
import register from '../assets/register.jpeg';
import user from '../assets/user.png';
import logout from '../assets/logout.png';
import cart from '../assets/cart.png';
import DatabaseInterface from '../DBInterface';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { useEffect, useState} from 'react';

const NavItem = () => {
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(token !== "");
  const [isAdmin, setIsAdmin] = useState(false);
  const { setUserData, userData } = useContext(UserContext);
  const navigate = useNavigate();
  
  const logoutHandler = () => {
    localStorage.setItem('token', "");
    setUserData({ token: undefined, user: undefined });
    setIsLoggedIn(false);
    navigate('/');
  };
  
  const dbInterface = new DatabaseInterface();

  useEffect(() => {
    const fetchUserType = async () => {
      console.log(userData.user);
      console.log(userData.user.userType);
      try {
        if (userData.user && userData.user.userType) {
          const ThisUserType = await dbInterface.getUserTypeById(userData.user.userType);
          setIsAdmin(ThisUserType.userType === "admin");
        }
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    };
  
    if (isLoggedIn) {
      fetchUserType();
    } else {
      setIsAdmin(false);
    }
  }, [isLoggedIn, userData.user]);

  return (
    <ul className='nav-items'>
      {/* {isLoggedIn && (
        <figure>
          <img src={ticket} alt="Book Ticket" className="bookticket" />
          <li><Link to="/buyTickets">Book Ticket</Link></li>
        </figure>
      )} */}

      {!isLoggedIn && (
        <figure>
          <img src={login} alt="Login" className="login" />
          <li><Link to="/login" className='logintxt'>Login</Link></li>
        </figure>
      )}
      
      {isLoggedIn && (
        <figure>
          <img src={logout} alt="Logout" className="logout" />
          <button onClick={logoutHandler} className="logout-btn">Logout</button>
        </figure>
      )}
      
      {!isLoggedIn && (
        <figure>
          <img src={register} alt="register" className="register" />
          <li><Link to="/register" className='regitxt'>Register</Link></li>
        </figure>
      )}

      {isLoggedIn && (
        <figure>
          <img src={edit} alt="Edit Profile Icon" className="edit" />
          <li className='profile'><Link to="/profile" className='profiletxt'>Edit Profile</Link></li>
        </figure>
      )}

      

      {isLoggedIn && (
        <figure>
          <img src={cart} alt="Order History" className="history" />
          <li><Link to="/orderHistory" className='orderHistory'>Order History</Link></li>
        </figure>
      )}
      
      {isAdmin && (
        <figure>
          <img src={adminIcon} alt="Admin Page Icon" className="admin" />
          <li><Link to="/adminView" className='admintxt'>Admin Page</Link></li>
        </figure>
      )}
    </ul>
  );
};

export default NavItem;