import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Header from '../Header';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { state } = location; // Correctly extracting the state from location

  if (!state) {
      return <Navigate to="/" />;
  }

  const { bookingDetails, tickets, userData, movies, movieShowTimes, ticketTypePrices } = state;

  return (
      <div>
        <Header />
          <h2>Order Confirmation</h2>
          <div>
              <h2>Booking Summary</h2>
              <p>User: {userData.user.firstName} {userData.user.lastName}</p>
              <p>Movie: {movies.movie_title}</p>
              <p>Show Time: {movieShowTimes.find(showtime => showtime._id === bookingDetails.showTimeID)?.timeStamp}</p>
              <p>Number of Tickets: {bookingDetails.numberOfTickets}</p>
              <p>Total Price: ${bookingDetails.totalPrice.toFixed(2)}</p>
              <h3>Selected Seats:</h3>
              <ul>
                  {tickets.map((ticket, index) => (
                      <li key={index}>
                          Seat {tickets.find(seat => seat._id === ticket.seatID)?.seatRow}-{tickets.find(seat => seat._id === ticket.seatID)?.seatColumn}: {ticketTypePrices.find(price => price._id === ticket.ticketTypeID)?.type}
                      </li>
                  ))}
              </ul>
          </div>
      </div>
  );
};

export default OrderConfirmationPage;
