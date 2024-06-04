import DatabaseInterface from '../DBInterface';
import { useEffect, useContext, useState } from 'react';
import Header from './Header';
import Card from './Card';
import Button from './Button';
import '../css/EditProfileForm.css';
import UserContext from '../context/UserContext';
import axios from 'axios';
const bcryptjs = require('bcryptjs');

const EditProfileForm = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [enteredEmailAddress, setEnteredEmailAddress] = useState('');
  const [enteredFirstname, setEnteredFirstname] = useState('');
  const [enteredLastname, setEnteredLastname] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredCardnum, setEnteredCardnum] = useState('');
  const [enteredCvv, setEnteredCvv] = useState('');
  const [enteredAddress, setEnteredAddress] = useState('');
  const [enteredBillingAddress, setEnteredBillingAddress] = useState('');
  const [enteredBillingName, setEnteredBillingName] = useState('');
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
  const [enteredMonth, setEnteredMonth] = useState('');
  const [enteredYear, setEnteredYear] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(true);
  const userId = userData.user.id;
  const token = localStorage.getItem('token');
  const [userCards, setUserCards] = useState([]);
  const DBInterface = new DatabaseInterface();
  useEffect(() => {
    fetchUserData();
    fetchCardData();
    userCardTest();
  }, [userId]);

  const fetchUserData = async () => {
    setEnteredEmailAddress(userData.user.email);
    setEnteredFirstname(userData.user.firstName);
    setEnteredLastname(userData.user.lastName);
    setEnteredAddress(userData.user.address);
    setEnteredPhoneNumber(userData.user.phone);
  };
  const userCardTest = async () => {
    const response = await DBInterface.getAllUserCards(userId);
    console.log(response);
  };

  const fetchCardData = async () => {
    try {
      const response = await DBInterface.getAllUserCards(userId);
      setUserCards(response);
    } catch (error) {
      console.error(error);
    }
  };

  const addUserHandler = async (event) => {
    event.preventDefault();

    // Check if entered current password matches the one stored in the backend
    const passwordMatches = await checkPasswordMatch(enteredPassword, userData.user.password);

    if (!passwordMatches) {
      alert("Current password is incorrect");
      return;
    }

    // Allow the user to change their password only if the new password is entered and matches the confirm password
    const newPasswordToUse = newPassword ? newPassword : userData.user.password;

    const newEditProfile = {
      email: enteredEmailAddress,
      firstName: enteredFirstname,
      lastName: enteredLastname,
      password: newPasswordToUse,
      address: enteredAddress,
      cardnumber: enteredCardnum,
      cvv: enteredCvv,
      phone: enteredPhoneNumber
    };

    try {
      const response = await axios.put(`http://localhost:4000/api/users/${userId}`, newEditProfile);
      setUserData({
        token: token,
        user: response.data.user,
      });
      alert("Profile edited successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const checkPasswordMatch = async (testPassword, encryptedP) => {
    const match = await bcryptjs.compare(testPassword, encryptedP);
    setPasswordMismatch(!match);
    return match;
  };

  const addCardHandler = async (event) => {
    event.preventDefault();
    const newCard = {
      cardNumber: enteredCardnum,
      expirationDate: `${enteredMonth}/${enteredYear}`,
      name: enteredBillingName,
      userID: userId,
      address: enteredBillingAddress
    };

    try {
      await axios.post('http://localhost:4000/api/paymentCard', newCard);
      alert('Card added successfully');
      fetchCardData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCardHandler = async (cardId) => {
    try {
      await axios.delete(`http://localhost:4000/api/paymentCard/${cardId}`);
      alert('Card deleted successfully');
      fetchCardData();
    } catch (error) {
      console.error(error);
    }
  };

  const editCardHandler = async (cardId, updatedCard) => {
    try {
      await axios.put(`http://localhost:4000/api/paymentCard/${cardId}`, updatedCard);
      alert('Card updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const changeCardData = (index, field, value) => {
    const updatedCards = [...userCards];
    updatedCards[index][field] = value;
    setUserCards(updatedCards);
  };

  return (
    <div>
      <Header />
      
      <section className='editprofile'>
        <Card className="edit-profile-card">
          <p className='editprofiletitle'>Edit Profile</p>
          <form onSubmit={addUserHandler}>

            <label className='edit-profile-label'>Email Address</label>
            <p className='editprofiletitle'>{enteredEmailAddress}</p>

            <label className='edit-profile-label'>First Name</label>
            <input
              type="text"
              className="edit-profile-input"
              value={enteredFirstname}
              onChange={(e) => { setEnteredFirstname(e.target.value) }}
            />

            <label className='edit-profile-label'>Last Name</label>
            <input
              id="lastname"
              type="text"
              className="edit-profile-input"
              value={enteredLastname}
              onChange={(e) => { setEnteredLastname(e.target.value) }}
            />

            <label className='edit-profile-label'>Enter Your Current Password</label>
            <input
              id="password"
              type="password" // Change type to password
              className="edit-profile-input"
              value={enteredPassword}
              onChange={(e) => { setEnteredPassword(e.target.value) }}
            />

            <label className='edit-profile-label'>Enter Your New Password</label> {/* Moved this label here */}
            <input
              id="newPassword"
              type="password" // Change type to password
              className="edit-profile-input"
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value) }}
            />

            {/* <label className='edit-profile-label'>Address</label>
            <input
              id="address"
              type="text"
              className="reginput"
              value={enteredAddress}
              onChange={(e) => { setEnteredAddress(e.target.value) }}
            /> */}

            <label className='edit-profile-label'>Phone Number</label>
            <input
              id="phoneNumber"
              type="text"
              className="edit-profile-input"
              value={enteredPhoneNumber}
              onChange={(e) => { setEnteredPhoneNumber(e.target.value) }}
            />

            <div className='btn-con-editprofile'>
              <Button type="submit" className="profilebutton">Confirm Changes</Button>
            </div>
          </form>
        </Card>
      </section>

{/* edit profile 끝. 그 밑에 form 들 */}

      <div>
        <section className='editprofile'>
          <Card className="edit-profile-card">
            <p className='editcreditcard'>Add New Credit Card</p>
            <form onSubmit={addCardHandler}>
            <label className='edit-profile-label'>Card Number</label>
              <input
                id="cardnumber"
                type="text"
                className="edit-profile-input"
                value={enteredCardnum}
                onChange={(e) => { setEnteredCardnum(e.target.value) }}
              />

              <label className='edit-profile-label'>Name on Card</label>
              <input
                id="nameoncard"
                type="text"
                className="edit-profile-input"
                value={enteredBillingName}
                onChange={(e) => { setEnteredBillingName(e.target.value) }}
              />

              <label className='edit-profile-label'>Billing Address</label>
              <input
                id="billingaddress"
                type="text"
                className="edit-profile-input"
                value={enteredBillingAddress}
                onChange={(e) => { setEnteredBillingAddress(e.target.value) }}
              />

              <select className='selectbox'
                value={enteredMonth}
                onChange={(e) => setEnteredMonth(e.target.value)}
                style={{ width: '150px', height: '40px' }}
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select className='selectbox'
                value={enteredYear}
                onChange={(e) => setEnteredYear(e.target.value)}
                style={{ width: '150px', height: '40px' }}
              >
                <option value="">Year</option>
                {Array.from(new Array(20), (_, i) => {
                  const year = new Date().getFullYear() + i;
                  const lastTwoDigits = year.toString().slice(-2);
                  return (
                    <option key={year} value={lastTwoDigits}>
                      {lastTwoDigits}
                    </option>
                  );
                })}
              </select>

              <label className='edit-profile-label'>cvv</label>
              <input
                id="cvv"
                type="text"
                className="edit-profile-input"
                value={enteredCvv}
                onChange={(e) => { setEnteredCvv(e.target.value) }}
              />

              <div className='btn-con-editprofile'>
                <Button type="submit" className="profilebutton">Confirm Changes</Button>
              </div>
            </form>
          </Card>
        </section>
      </div>

      {userCards.map((card, index) => (
        <section className='editprofile' key={card._id}>
          <Card className="edit-profile-card">
            <p className='editcreditcard'>Edit Current Cards</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              editCardHandler(card._id, userCards[index]);
            }}>
              <label className='edit-profile-label'>Name on Card</label>
              <input
                id="nameoncard"
                type="text"
                className="edit-profile-input"
                value={card.name}
                onChange={(e) => { changeCardData(index, 'name', e.target.value) }}
              />

              <label className='edit-profile-label'>Billing Address</label>
              <input
                id="billingaddress"
                type="text"
                className="edit-profile-input"
                value={card.address}
                onChange={(e) => { changeCardData(index, 'address', e.target.value) }}
              />

              <label className='edit-profile-label'>Card Number</label>
              <input
                id="cardnumber"
                type="text"
                className="edit-profile-input"
                value={card.cardNumber}
                onChange={(e) => { changeCardData(index, 'cardNumber', e.target.value) }}
              />

              <label className='edit-profile-label'>Expiration Date</label>
              <input
                id="expirationDate"
                type="text"
                className="edit-profile-input"
                value={card.expirationDate}
                onChange={(e) => { changeCardData(index, 'expirationDate', e.target.value) }}
              />

              <label className='edit-profile-label'>CVV</label>
              <input
                id="cvv"
                type="text"
                className="edit-profile-input"
                value={card.cvv}
                onChange={(e) => { changeCardData(index, 'cvv', e.target.value) }}
              />

            <div className='btn-con-editprofile'>
              <Button type="submit" className="profilebutton">submit Changes</Button> <br></br>
              <Button onClick={() => deleteCardHandler(card._id)} className="profilebutton">Delete Card</Button>
            </div>
            </form>
          </Card>
        </section>
      ))}

      <footer className="footer" style={{ backgroundColor: '#f5e9e6' }}>
          <p>© 2024 Dohee Kim. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default EditProfileForm;