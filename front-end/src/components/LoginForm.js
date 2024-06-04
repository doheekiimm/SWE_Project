import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import '../css/LoginForm.css';
import Header from './Header';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import  UserContext  from '../context/UserContext';  

const LoginForm = () => {
  const [enteredEmailAddress, setEnteredEmailAddress] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setEnteredEmailAddress(userEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/api/users/login', {
        email: enteredEmailAddress,
        password: enteredPassword
      });

      localStorage.setItem('token', response.data.token);
      setUserData({
        token: response.data.token,
        user: response.data.user
       
      });
      console.log(response.data.user);
      
      if (rememberMe) {
        localStorage.setItem('userEmail', enteredEmailAddress);
      } else {
        localStorage.removeItem('userEmail');
      }

      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred during login.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div>
      <Header />
      <section className='login-section' style={{ backgroundColor: '#f5e9e6' }}>
        <Card className="form-container">
          <div className='login_form'>Login</div>
          <form className="form" onSubmit={handleLogin}>
            <div className="field-container1">
              <label htmlFor="email" className="label">Email</label>
              <input
                type="email"
                id="email"
                className="login_input"
                value={enteredEmailAddress}
                onChange={(e) => setEnteredEmailAddress(e.target.value)}
              />
            </div>
            <div className="field-container2">
              <label htmlFor="password" className="label">Password</label>
              <input
                type="password"
                id="password"
                className="regi_input"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
              />
            </div>

            <div className="remember-me" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', height: '40px' }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                style={{ marginRight: '10px', marginTop: '20px' }}
              />
              <label htmlFor="rememberMe" className='rememberMe'>Remember Me</label>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="submit-container">
                  <Button type="submit" className="submit-button">Login</Button>
                </div>
              </>
            )}

            <div className='linktoregi'>
              <p className='yet'>Don't have an account yet?</p>
              <Link to='/register' className='regi'>Create an Account</Link>
            </div>
          </form>
        </Card>

        <footer className="footer" style={{ backgroundColor: '#f5e9e6' }}>
            <p>© 2024 The Seanema Movie. All rights reserved.</p>
        </footer>
      </section>
    </div>
  );
};

export default LoginForm;

