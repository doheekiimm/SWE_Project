//we need them to select a movie showtime before we can render any other info 
//options for the user to select a movie showtime: dropdown menu or buttons along center


//once they select a movie showtime, we can take the id of the specific movieshow and use it to get all the other info from the DB 


//once we have the id of the specific show, we can get all the other info and make the booking 


//get the auditorium for the movieshow and render seats selectively based on number in auditorium 

//tickets will be part of the booking selected based on ticket type prices from front end here, that data goes to booking 
//we make a booking from the movieshow 

//the  booking has the userID and ticket ID refferences the ticket 
 
//we need the booking objects tied to the ticket options 

//booking list 

//order history page shoukd show all the bookings made by the user
import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/BookTicketPage.css'; 
import Header from './Header';
import DatabaseInterface from '../DBInterface';
import  UserContext  from '../context/UserContext';
import Card from './Card';

const BookTicketPage = () => {
  const navigate = useNavigate();
  const [userCards, setUserCards] = useState([]);
  const[promotions, setPromotions] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movieShows, setMovieShows] = useState([]); 
  const [movieShowTimes, setMovieShowTimes] = useState([]);
  const [ticketTypePrices, setTicketTypePrices] = useState([]);
  const [seats, setSeats] = useState([]);
  const [auditorium, setAuditorium] = useState([]);
  const [selectedMovieShow, setSelectedMovieShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [enteredCardnum, setEnteredCardnum] = useState('');
  const [enteredBillingName, setEnteredBillingName] = useState('');
  const [enteredBillingAddress, setEnteredBillingAddress] = useState('');
  const [enteredMonth, setEnteredMonth] = useState('');
  const [enteredYear, setEnteredYear] = useState('');
  const [numTickets, setNumTickets] = useState(0);
  const { userData, setUserData } = useContext(UserContext);
  const { movieId } = useParams();  
  const userId = userData.user.id;
  const [loadingMovieShows, setLoadingMovieShows] = useState(true);
  const [loadingSeats, setLoadingSeats] = useState(false);
const [loadingAuditorium, setLoadingAuditorium] = useState(false);
const [loadingTicketTypePrices, setLoadingTicketTypePrices] = useState(false);
const [showChooseTicketTypes, setShowChooseTicketTypes] = useState(false); 
const [showCardSelection, setShowCardSelection] = useState(false);
const [showBookingSummary, setShowBookingSummary] = useState(false);
const [promoCode, setPromoCode] = useState("");
const [promoAdded, setPromoAdded] = useState(null);
const [promoTotalPrice, setPromoTotalPrice] = useState(0);
const [discountAmount, setDiscountAmount] = useState(0);
  const [bookingDetails, setBookingDetails] = useState({
    userId: userId,
    movieShowID: '',
    showTimeID: '',
    cardID: '',
    numberOfTickets: numTickets,
    totalPrice: 0,
    promoID: "6639955efe4eb85bd6d841c2",
  });
  const [tickets, setTickets] = useState([]); 
  const [ticketDetails, setTicketDetails] = useState({
    bookingID: '',
    ticketTypeID: '',
    seatID: '',
  });
    
  const dbInterface = new DatabaseInterface();

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        console.log("Fetching user cards...")
        // Fetch payment cards filtered by userID
        const userCardData = await dbInterface.getAllUserCards(userId);
        setUserCards(userCardData);
        console.log("User cards:", userCards);
       
      } catch (error) {
        console.error('Error fetching user cards:', error);
      }
    };
    const fetchPromos = async () => {
      try {
        console.log("Fetching promos...");
        const promos = await dbInterface.getAllPromotions(); 
        console.log(promos);
        setPromotions(promos);
        console.log("Promotions:", promotions);
      } catch (error) {
        console.error('Error fetching promos:', error);
      }
    };

    fetchUserCards();
    fetchPromos();
  }, [userId]);
//gets the movie data from the database from ID passed from movie component 
useEffect(() => {
  const fetchMovieDetails = async () => {
    try {
      console.log("Fetching movie details...");
      const movieData = await dbInterface.getMovieById(movieId);
      console.log("Movie details:", movieData);
      setMovies(movieData);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchMovieShows = async () => {
    try {
      setLoadingMovieShows(true);
      console.log("Fetching movie shows...");
      const allMovieShows = await dbInterface.getAllMovieShows();
      console.log("Movie shows:", allMovieShows);
      setMovieShows(allMovieShows.filter((movieShow) => movieShow.movieID === movieId));
     } catch (error) {
      console.error('Error fetching movie shows:', error);
    }
  };
  const fetchMovieShowtimes = async () => {
   try {
    console.log("Fetching movie showtimes...");
    const allMovieShowtimes = await dbInterface.getAllShowTimes(); 
    setMovieShowTimes(allMovieShowtimes); 
    setLoadingMovieShows(false);
   } catch(error) {
    console.error('Error fetching showtimes:', error);
   }
  };
  const fetchTicketTypePrices = async () => {
    try {
      setLoadingTicketTypePrices(true);
      console.log("Fetching ticket type prices...");
      const allTicketTypePrices = await dbInterface.getAllTicketTypePrices();
      console.log("Ticket type prices:", allTicketTypePrices);
      setTicketTypePrices(allTicketTypePrices);
      setLoadingTicketTypePrices(false);
    } catch (error) {
      console.error('Error fetching ticket type prices:', error);
    }
  };
  fetchMovieDetails();
  fetchMovieShows();
  fetchMovieShowtimes();
  fetchTicketTypePrices();
}, [movieId]);

useEffect(() => {
  const fetchAuditorium = async () => {
    try {
      setLoadingAuditorium(true);
      console.log("Fetching auditorium details...");
      
      if (selectedMovieShow) {
        const auditoriumID = selectedMovieShow.auditoriumID;
        const auditoriumData = await dbInterface.getAuditoriumById(auditoriumID);
        setAuditorium(auditoriumData);
        console.log("Auditorium:", auditoriumData);
      }
      
      setLoadingAuditorium(false);
    } catch (error) {
      console.error('Error fetching auditorium details:', error);
    }
  };

  fetchAuditorium();
}, [selectedMovieShow]);

useEffect(() => {
  const fetchSeats = async () => {
    try {
      setLoadingSeats(true);
      console.log("Fetching seat details...");
  
      if (auditorium) {
        const auditoriumID = auditorium._id;
        console.log("Auditorium ID:", auditoriumID);

        const allSeats = await dbInterface.getAllSeats();
        console.log("All Seats:", allSeats);
        
        const seatsForAuditorium = allSeats.filter((seat) => seat.auditoriumID === auditoriumID);
        console.log("Seats for Auditorium:", seatsForAuditorium);

       const seatsArray = Array.from({ length: auditorium.seatRow }, () => Array(auditorium.seatColumn).fill(null));
       console.log("Seats Array:", seatsArray);
        
        seatsForAuditorium.forEach(seat => {
          seatsArray[seat.seatRow - 1][seat.seatColumn - 1] = seat;
        });

        setSeats(seatsArray);
        
        console.log("Seats:", seatsArray);
      }
      
      setLoadingSeats(false);
      
    } catch (error) {
      console.error('Error fetching seat details:', error);
    }
  };

  fetchSeats();
}, [auditorium]);


const handleMovieShowSelection = (movieShowId) => {
  const selectedMovieShow = movieShows.find((movieShow) => movieShow._id === movieShowId);
  if (selectedMovieShow) {
    setSelectedMovieShow(selectedMovieShow);
    setBookingDetails({
      ...bookingDetails,
      movieShowID: selectedMovieShow._id,
      showTimeID: selectedMovieShow.showTimeID,
    })
    console.log("Booking Details: ", bookingDetails); 
  }

};

  const handleSeatSelection = (seatId) => {
    const updatedSeats = seats.map((row) =>
      row.map((seat) =>
        seat._id === seatId ? { ...seat, isSelected: !seat.isSelected } : seat
      )
    );
    setSeats(updatedSeats);
  };
  const saveSelectedSeats = () => {
    const selectedSeatsIds = seats
      .flat()
      .filter((seat) => seat.isSelected)
      .map((seat) => seat._id);
    setSelectedSeats(selectedSeatsIds);

    // Create tickets for each selected seat
    const selectedTickets = selectedSeatsIds.map((seatId) => ({
      ticketTypeID: '', // Set the ticket type ID for each ticket
      seatID: seatId,
    }));
    setTickets(selectedTickets);
    
    setShowChooseTicketTypes(true);
  };


  const deleteTicket = (ticketId) => {
    const updatedTickets = bookingDetails.tickets.filter(
      (ticket) => ticket.id !== ticketId
    );
    setTickets(updatedTickets);
  };

  const handleTicketTypeChange = (e, seatId) => {
    const selectedTicketTypeId = e.target.value;
    console.log(e.target.value); 
    const updatedTickets = tickets.map((ticket) =>
      ticket.seatID === seatId
        ? { ...ticket, ticketTypeID: selectedTicketTypeId }
        : ticket
    ); // Update the ticket with the selected ticket type ID
    setTickets(updatedTickets); // Update the tickets state with the updated tickets
    console.log("Tickets: ", tickets);
  };

 
// Function to handle ticket type confirmation
const handleTicketTypeConfirmation = () => {
  console.log("Tickets: ", tickets);
  // Calculate the order total from the tickets
  const totalPrice = tickets.reduce((total, ticket) => {
    const ticketType = ticketTypePrices.find((price) => price._id === ticket.ticketTypeID);
    if (ticketType) {
      return total + ticketType.price;
    }
    return total;
  }, 0);
  
  // Update booking details with the total price
  setBookingDetails(prevBookingDetails => ({
    ...prevBookingDetails,
    totalPrice: totalPrice,
    numberOfTickets: tickets.length,
  }));

  // Show card selection form
  setShowCardSelection(true);
};

const handleCardSelection = (card) => {
  setSelectedCard(card._id);
  setBookingDetails(prevBookingDetails => ({
    ...prevBookingDetails,
    cardID: card._id,
  }));
  console.log("Booking details: ", bookingDetails);
  setShowBookingSummary(true);
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
    const createdCard = await dbInterface.createPaymentCard(newCard); // Modify this line according to your backend API endpoint
    alert('Card added successfully');
    // Fetch user cards again to update the list
    setUserCards([...userCards, createdCard]);
    setSelectedCard(createdCard._id);
  } catch (error) {
    console.error(error);
    alert('Failed to add card');
  }
};
  const handleAddPromo = () => {
   console.log("Promo code: ", promoCode);
   console.log("Promotions: ", promotions);
    const promo = promotions.find((promo) => promo.code === promoCode);
    console.log("Promo: ", promo);
    if (promo) {
      setPromoAdded(promo);
      const discount = bookingDetails.totalPrice * promo.percentageNumber; 
      const newTotal = bookingDetails.totalPrice - discount;
      setPromoTotalPrice(newTotal);
      setDiscountAmount(discount);
      bookingDetails.totalPrice = newTotal;
      bookingDetails.promoID = promo._id;
    } else {
      alert("Invalid promo code");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bookingDetails.movieShowID) {
      alert("Please select a movie show time");
      return;
    } else if (!bookingDetails.cardID) {
      alert("Please select a card for payment");
      return;
    } else if (tickets.length === 0) {
      alert("Please select at least one ticket");
      return;
    }
  
    try {
      // Create the booking
      
      const bookingId = await dbInterface.createBooking(bookingDetails);
      console.log("Booking ID: ", bookingId);

      console.log("Booking Details: ", bookingDetails);
      // Update tickets with the booking ID
      const updatedTickets = tickets.map((ticket) => ({
        ...ticket,
        bookingID: bookingId.id,
      }));
     setTickets(updatedTickets);
      console.log("Updated Tickets: ", updatedTickets);
      // Post tickets
      await Promise.all(updatedTickets.map(async (ticket) => {
        await dbInterface.setSeatsUnavalible(ticket.seatID);
        await dbInterface.createTicket(ticket);
      }));
  
      // Update the available seats count
      const movieShow = movieShows.find((movieShow) => movieShow._id === bookingDetails.movieShowID);
      const updatedMovieShow = {
        ...movieShow,
        numberOfAvailableSeats: movieShow.numberOfAvailableSeats - bookingDetails.numberOfTickets,
      };
      await dbInterface.updateMovieShow(movieShow._id, updatedMovieShow);
      alert("Booking created successfully");
   
      navigate('/orderConfirm', {state: {bookingDetails: {bookingDetails}}});

    } catch (error) {
      console.error('Error creating booking/tix:', error);
      alert("Error creating booking");
    }
  };

  return (
    <div > 
      <Header />
      <section className="full"> 
        <h2 className='page-title'>Book Your Tickets for {movies.movie_title} </h2>
        <div className="movieShow-selection">
          <label className='input-label'> Select Movie Show Time :</label>
          <div className="movie-show-buttons">
            {loadingMovieShows ? (
              <p>Loading movie shows...</p>
            ) : (
              movieShows.map((movieShow) => (
                <button
                  key={movieShow._id}
                  onClick={() => handleMovieShowSelection(movieShow._id)}
                  className={selectedMovieShow === movieShow._id ? 'selected' : ''}
                >
                  {movieShowTimes.find((showtime)=> showtime._id === movieShow.showTimeID).timeStamp} {/* Assuming showTime is a property of movieShow */}
                </button>
              ))
            )}
          </div>
        </div> 
        {selectedMovieShow && auditorium && (
          <>
            <label className='input-label'>Select Seats:</label>
            <div className='screen'>Screen</div>
            <div className='seats-container'>
              {loadingSeats ? (
                <p>Loading seats...</p>
              ) : (
                seats.map((row, rowIndex) => (
                  <div key={rowIndex} className='seat-row'>
                    {row.map((seat) => (
                      <button
                        key={seat._id}
                        className={`seat-btn ${seat.isTaken ? 'taken' : ''} ${seat.isSelected ? 'selected' : ''}`}
                        disabled={seat.isTaken}
                        style={{
                          background: seat.isSelected ? 'orangered' : 'black',
                          color: 'white',
                          border: '2px solid black', 
                          borderRadius: '10px', 
                          padding: '5px 10px',
                          margin: "5px",
                        }}
                        onClick={() => handleSeatSelection(seat._id)}
                      >
                        Seat {seat.seatRow}-{seat.seatColumn}
                      </button>
                    ))}
                  </div>
               
                ))
              )}
            </div>
            <button onClick={saveSelectedSeats} className = "continue">Confirm Seats</button>
          </>
        )}
        {showChooseTicketTypes && (
          <div className="choose-ticket-types-form">
            <h3>Choose Ticket Types</h3>
            {selectedSeats.map(seatId => (
              <div key={seatId} className="ticket-type-selection">
               <p>Seat {seats.flat().find(seat => seat._id === seatId).seatRow} - {seats.flat().find(seat => seat._id === seatId).seatColumn}</p>
                <select onChange={(e) => handleTicketTypeChange(e, seatId)}>
                  <option value="">Select Ticket Type</option>
                  {ticketTypePrices.map((price) => (
                    <option key={price._id} value={price._id}>
                      {price.type} - ${price.price}
                    </option>
                  ))}
                </select>
                <button onClick = {deleteTicket}>Remove Ticket</button>
              </div>
                 
            ))}
                <button onClick={handleTicketTypeConfirmation} className= "continue">Confirm Ticket Types</button>
        {showCardSelection && (
        <div>
           <h3>Total Price: ${bookingDetails.totalPrice.toFixed(2)}</h3>
          <h2>Select Payment Card:</h2>
          <ul className = "card-list">
            {userCards.map((card) => (
              <li key={card._id} onClick={() => handleCardSelection(card)}className={selectedCard === card._id ? 'selected' : ''}>
                Card Number: {card.cardNumber}, Expiry: {card.expirationDate}
              </li>
            ))}
          </ul>
          <Card className="inputforeidtprofile">
            <p className='editcreditcard'>Add New Credit Card</p>
            <form onSubmit={addCardHandler}>
              <label>Card Number</label>
              <input
                id="cardnumber"
                type="text"
                className="reginput"
                value={enteredCardnum}
                onChange={(e) => { setEnteredCardnum(e.target.value) }}
              />

              <label>Name on Card</label>
              <input
                id="nameoncard"
                type="text"
                className="reginput"
                value={enteredBillingName}
                onChange={(e) => { setEnteredBillingName(e.target.value) }}
              />

              <label>Billing Address</label>
              <input
                id="billingaddress"
                type="text"
                className="reginput"
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
              <button className = "card-button" type="submit">Add Card</button>
            </form>
          </Card>
        </div>
        
      )}
      {showBookingSummary && (
        <div className='parent-cont'>
            <div className="booking-summary">
            <h2>Order Summary</h2>
            <p>User: {userData.user.firstName} {userData.user.lastName}</p>
            <p>Movie: {movies.movie_title}</p>
            <p>Show Time:  {movieShowTimes.find((showtime) => showtime._id === selectedMovieShow.showTimeID)?.timeStamp}</p>
            <p>Number of Tickets: {bookingDetails.numberOfTickets}</p>

            <p>Selected Seats:</p>
            <ul>
              {tickets.map((ticket, index) => (
                <li>Seat {seats.flat().find(seat => seat._id === ticket.seatID).seatRow} - {seats.flat().find(seat => seat._id === ticket.seatID).seatColumn} :     
                 {ticketTypePrices.find(price => price._id === ticket.ticketTypeID).type}
              </li>
              ))}
            </ul>
            <p>Total Price: ${bookingDetails.totalPrice.toFixed(2)}</p>
           {promoAdded && (
            <div className = "promoTotals">
            <p> - {discountAmount} </p>
            <p> = {promoTotalPrice} </p>
            <p>Promo Code: {promoAdded.promoCode}</p>
            </div>

          )}
        </div>
        <div className="promo-code">
          <h2>Enter Promo Code</h2>
          <input type="text" placeholder="Enter Promo Code" onChange={(e) => setPromoCode(e.target.value)} />
          <button onClick={() => handleAddPromo(promoCode)}>Add Promo</button>
        </div>
          </div>
    
      )}
                  <button onClick={handleSubmit} className="submit">Submit Booking</button>
          </div>
        )}
      </section>
    </div>
  );
};
  
export default BookTicketPage;
