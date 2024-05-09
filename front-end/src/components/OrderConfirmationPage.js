import React, { useState, useEffect } from 'react';
import { Link, useParams,useLocation } from 'react-router-dom';
import Card from './Card';
import Button from './Button';
import '../css/OrderConfirmationPage.css';
import DatabaseInterface from '../DBInterface';
import BookingDisplay from './BookingDisplay';
import Header from './Header';
const OrderConfirmation = (props) =>{

    const location = useLocation();
    const { bookingDetails } = location.state;
    console.log(bookingDetails);
    const booking = bookingDetails.bookingDetails;

return(
<div>
    <Header/>
    <h2>Order Confirmation</h2>
    <h3>Thank you for your purchase! Your Order Details can be viewed here, on your profile, and in a reciept sent to your email. Enjoy the show!</h3>
    <Card className='input'>
    <BookingDisplay booking={booking}/>
    </Card>
    
</div>
);
}

export default OrderConfirmation;