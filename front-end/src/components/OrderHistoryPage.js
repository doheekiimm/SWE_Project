import React, { useEffect, useState, useContext } from 'react';
import DatabaseInterface from '../DBInterface';
import Header from './Header';
import UserContext from '../context/UserContext';
import BookingDisplay from './BookingDisplay';
import '../css/OrderHistoryPage.css';

const OrderHistoryPage = () => {
const dbInterface = new DatabaseInterface();
const [bookings, setBookings] = useState([]);
const {userData, setUserData} = useContext(UserContext);    
console.log('User data:', userData);
console.log('User ID:', userData.user.id);
useEffect(() => {
    fetchBookings();
}, []);
const fetchBookings = async () => {
    try {
        const theBookings = await dbInterface.getBookingsByUserId(userData.user.id);
        setBookings(theBookings);
        console.log(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
    }
};
return (
    <div>
      <Header />
      <div className='OrderHistoryPage'>
        <p className='orderHistoryTxt'>Order History</p>
        {bookings.map((booking) => (
            console.log(booking),
            <BookingDisplay key={booking._id} booking={booking} />
        ))} 
      </div>
    </div>
);
};
export default OrderHistoryPage;
