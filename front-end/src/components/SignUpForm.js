import React, { useState, useContext } from 'react';
import axios from 'axios';
import Card from './Card';
import Button from './Button';
import Header from './Header';
import '../css/SignUpForm.css';
import UserContext from '../context/UserContext';
import { Link, useNavigate} from 'react-router-dom';
import DatabaseInterface from '../DBInterface';


const SignUpForm = (props) => {
  const dbInterface = new DatabaseInterface();
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
  
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    address: '',
    status: '',
    userType: '',
    promotionSubscription: false,
    securityCode: Math.floor(10000000 + Math.random() * 90000000), 
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/users/signup', user);
      console.log('User created:', response.data);
      alert('New user successfully created');
  
      // Login the user after signup
      const loginResponse = await axios.post('http://localhost:4000/api/users/login', {
        email: user.email,
        password: user.password  // Include the password in the login request
      });
      console.log('User logged in:', loginResponse.data);
  
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
  
      localStorage.setItem('token', loginResponse.data.token);
  
      // Reset the form fields after successful signup  
      setUser({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        phone: '',
        address: '',
        status: '',
        userType: '',
        promotionSubscription: '',
      });
  
      // Navigate to confirmation page
      navigate('/SignUpConfirmation/' + response.data._id);
  
    } catch (error) {
      console.error('Error creating user:', error);
      console.log(setUser);
      alert('Failed to create user. Please try again.');
    }
  };
  return (
    <div>
      <Header />
      <section className="regi-section">
        <Card className="card">
          <p className="signuptxt">Create Your Account</p>
          <form className="regiform" onSubmit={handleSignup}>
            {/* Form fields */}
            {/* Email */}
            <label htmlFor="email" className='labelEmail'>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="reginput"
              value={user.email}
              onChange={handleChange}
            />
            {/* First Name */}
            <label htmlFor="firstName" className='labelFirstName'>First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="reginput"
              value={user.firstName}
              onChange={handleChange}
            />
            {/* Last Name */}
            <label htmlFor="lastName" className='labelLast'>Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="reginput"
              value={user.lastName}
              onChange={handleChange}
            />
            {/* Password */}
            <label htmlFor="password" className='labelPassword'>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="reginput"
              value={user.password}
              onChange={handleChange}
            />
            {/* Phone */}
            <label htmlFor="phone" className='labelPhone'>Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="reginput"
              value={user.phone}
              onChange={handleChange}
            />
            {/* Address */}
            <label htmlFor="address" className='labelAdress'>Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="reginput"
              value={user.address}
              onChange={handleChange}
            />
            {/* Promotion Subscription */}
            <label htmlFor="promotionSubscription" className='labelPromo'>Promotion Subscription</label>
            <input
              type="checkbox"
              id="promotionSubscription"
              name="promotionSubscription"
              className="reginput"
              checked={user.promotionSubscription}
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  promotionSubscription: e.target.checked
                }))
              }
            />
            {/* Submit Button */}
            
            <Button type="submit" className="signup">
              Sign Up
            </Button>
            {/* Login Link */}
            <p className="gotoLogin">
              Already have an account? <br />
              <a href="/login" className="linkforlogin">
                Login
              </a>
            </p>
          </form>
        </Card>
      </section>
    </div>
  );
};

export default SignUpForm;
