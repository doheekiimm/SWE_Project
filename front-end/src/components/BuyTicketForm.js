import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import '../css/EditPromoForm.css';
//import axios from 'axios';

const BuyTicketForm = props => {
    const[enteredMovie,setEnteredMovie] = useState('')
    const[enteredShowTime,setEnteredShowTime] = useState('')
    const[enteredSeats,setEnteredseats] = useState('')
    const[enteredAge,setEnteredAge] = useState('')

    const addTicketHandler = async event => {
      // prevents page refresh
        event.preventDefault();
    
      const newTicket ={
        title: enteredMovie,
        showtime: enteredShowTime,
        seats: enteredSeats,
        age: enteredAge
        
      };
      //clears form
      setEnteredMovie('');
      setEnteredShowTime('');
      setEnteredseats('');
      setEnteredAge('');
      
      props.onAddTicket(newTicket);
    
    }
      return (
        <Card className="input">
          <h1>Buy Ticket Form</h1>
          <form onSubmit ={addTicketHandler}>
            <label>Movie Title</label>
            <input
              id="title"
              type="text"
              value = {enteredMovie}
              onChange = {(e)=> {setEnteredMovie(e.target.value)}}
            />
            <label>Showtimes</label>
            <input
              id="title"
              type="text"
              value = {enteredShowTime}
              onChange = {(e)=> {setEnteredShowTime(e.target.value)}}
            />
            <label>Seats</label>
            <input
              id="title"
              type="text"
              value = {enteredSeats}
              onChange = {(e)=> {setEnteredseats(e.target.value)}}
            />
            <label>Select age</label>
            <input
              id="title"
              type="text"
              value = {enteredAge}
              onChange = {(e)=> {setEnteredAge(e.target.value)}}
            />
            <Button type="submit" className="promo">Add Movie Ticket</Button>
          </form>
        </Card>
      );
    };
    
    export default BuyTicketForm;