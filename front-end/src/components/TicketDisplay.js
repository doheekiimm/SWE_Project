import react from 'react';
import { useEffect, useState, useContext } from 'react';
import DatabaseInterface from '../DBInterface';
import UserContext from '../context/UserContext';

const TicketDisplay = (props) => {
    const { ticket } = props;
    const dbInterface = new DatabaseInterface();
    const [ticketTypePrice, setTicketTypePrice] = useState('');
    const [seat, setSeat] = useState('');
    useEffect(() => {
        const fetchAndLinkData = async () => {
            try {
                console.log('Ticket:', ticket);
                setTicketTypePrice(await dbInterface.getTicketTypePriceById(ticket.ticketTypeID));
            } catch (error) {
                console.error('Error fetching ticket type price:', error);
            }
            try { 
                console.log('Ticket:', ticket);
                setSeat(await dbInterface.getSeatById(ticket.seatID));
            }
            catch (error) {
                console.error('Error fetching seats:', error);
            }
        };
        fetchAndLinkData();
    }, []); // Run only once on component mount

    return (
        <section className = "ticket">
        <div>
            <p className="listing">Ticket ID: {ticket._id}</p>
            <p className= "listing"> Seat Number: {seat.seatRow} - {seat.seatColumn}</p>
            <p className="listing">Ticket Type: {ticketTypePrice.ticketType}</p>
            <p className="listing">Price: {ticketTypePrice.price}</p>
        </div>
        </section>
    );
}; 
export default TicketDisplay;