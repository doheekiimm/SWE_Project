import React, {useEffect, useState} from 'react';
import DatabaseInterface from '../DBInterface';
import TicketDisplay from './TicketDisplay';



const BookingDisplay = (props) => {
    const { booking } = props;
  const dbInterface = new DatabaseInterface();
const [movieShow, setMovieShow] = useState('');
const [showTime, setShowTime] = useState('');
const [paymentCard, setPaymentCard] = useState('');
const [promo, setPromo] = useState('');
const[movie, setMovie] = useState('');
const [auditorium, setAuditorium] = useState('');
const [tickets, setTickets] = useState('');
useEffect(() => {
    const fetchAndLinkData = async () => {
        try {
            console.log('Booking:', booking);
           setMovieShow(await dbInterface.getMovieShowById(booking.movieShowID));
              setShowTime(await dbInterface.getShowTimeById(booking.showTimeID));
                setPaymentCard(await dbInterface.getPaymentCardById(booking.cardID)); 
            //  setTickets(await dbInterface.getTicketByBooking(booking._id));
                // console.log('Tickets:', tickets);
                if(booking.promoID) {
                    setPromo(await dbInterface.getPromotionById(booking.promoID));
                }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };
    fetchAndLinkData();
}, []); // Run only once on component mount

useEffect(() => {
    if (movieShow) {
        dbInterface.getAuditoriumById(movieShow.auditoriumID)
            .then(setAuditorium)
            .catch(error => console.error('Error fetching auditorium:', error));
        dbInterface.getMovieById(movieShow.movieID)
            .then((response) => 
                setMovie(response))
            .catch(error => console.error('Error fetching movie:', error));
        
        }

}
, [movieShow,tickets]); // Run whenever movieShow changes

    return (
        <section className="booking">
            <div>
                <h1>Booking</h1>
                {booking._id && <p className="listing">Booking ID: {booking._id}</p>}
                <p className="listing">Movie: {movie.movie_title}</p>
                <p className="listing">Movie Time: {showTime.timeStamp}</p>
                <p className="listing">Auditorium: {auditorium.auditoriumName}</p>
                <p className="listing">Number of Tickets: {booking.numberOfTickets}</p>
                <p className="listing">Total Order Price: {booking.totalPrice}</p>
                <p className="listing">Promotion: {promo ? promo.promoCode : 'None'}</p>
            </div>
            <div>
            </div>
        </section>
    );
}

export default BookingDisplay;
