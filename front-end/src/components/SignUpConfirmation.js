import {useContext, useState } from 'react';
import Button from './Button';
import '../css/SignUpConfirmation.css';
import Card from './Card';
import Header from './Header';
//import UserContext from '../context/UserContext';
//import { Link, useNavigate} from 'react-router-dom';
import UserContext from '../context/UserContext';
import DatabaseInterface from '../DBInterface';
import { useNavigate } from 'react-router-dom';
const SignUpConfirmation = () => {
 const navigate = useNavigate() ;
  const [enteredSecurityCode, setEnteredSecurityCode] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const { userData, setUserData } = useContext(UserContext);
  console.log('User data:', userData);
  const dbInterface = new DatabaseInterface();
  const token = localStorage.getItem('token');
 const userId = userData.user.id;
 console.log(userId);
 console.log('User ID:', userId);
  const userSecurityCode = userData.user.securityCode;
  console.log('User Security Code:', userSecurityCode);

  const codeHandler = async (event) => {
    event.preventDefault(); // Prevents page refresh

    try {
      // Check if entered security code matches the user's security code
      if (userSecurityCode !== enteredSecurityCode) {
        alert('Invalid Security Code');
        return;
      }

      // Clear the entered security code
     //setEnteredSecurityCode('');

      // Get the ID of the "active" status from the server
      const statusesResponse = await dbInterface.getAllStatuses();
      const activeStatusId = statusesResponse.find(status => status.statusType === 'active')._id;
      console.log('Active status ID:', activeStatusId);
      // Update user status to "active"
      const updatedUser = await dbInterface.updateUser(userId, { ...userData.user, status: activeStatusId });
      console.log('Updated user:', updatedUser);
      // Show success message
      alert('Account Successfully Verified');
      // Redirect to the home page
      navigate('/');
    } catch (error) { 
      console.error('Error:', error);
      alert('Failed to confirm sign up. Please try again.');
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
          <div >
          {<Card className="input">
          <h2> Please check your email and enter the sent Security Code</h2>
          <form onSubmit={codeHandler}>
            <label>Security Code</label>
            <input
              id="securityCode"
              type="text"
              value={enteredSecurityCode}
              onChange={(e) => { setEnteredSecurityCode(e.target.value) }}
            />
            <br></br>
            <Button className = "confirm-button" type="submit">Submit</Button>
          </form>
           </Card> }
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpConfirmation;
