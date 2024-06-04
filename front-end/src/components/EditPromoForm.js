import React, { useState } from 'react';
import Header from './Header';
import Button from './Button';
import '../css/EditPromoForm.css';
//import axios from 'axios';
import DatabaseInterface from '../DBInterface'; 


const EditPromoForm = props => {
    const[enteredPromoCode,setEnteredPromoCode] = useState('')
    const[enteredPercentage,setEnteredPercentage] = useState('')
    const[enteredPercentageNumber,setEnteredPercentageNumber] = useState('')
    const[enteredEndDate,setEnteredEndDate] = useState('')
    const dbInterface = new DatabaseInterface();

    const editPromoHandler = async event => {
      // prevents page refresh
        event.preventDefault();
    
      const newPromo ={
        code: enteredPromoCode,
        percentage: enteredPercentage,
        percentageNumber: enteredPercentageNumber,
        endDate: enteredEndDate,
        isUsed: false,
      };
      //clears form
      setEnteredPromoCode('');
      setEnteredPercentage('');
      setEnteredPercentageNumber('');
      setEnteredEndDate('')

      // Database Calls to send Data
      ////////////////////////////////////////////////////////////////////
      const postPromo = async() => {
        try{
          const fullPromo = await dbInterface.createPromotion(newPromo)
          console.log(fullPromo)
          // 
        } catch(error){console.error('Error Posting promotion:', error);}
        };
        postPromo();
      ////////////////////////////////////////////////////////////////////
    
    }
      return (
        <div>
          <Header/>

          <div className='promo-cover'>
          <div className="edit-promo-form">
          {/* <Card className="input"> */}
          <p className='add-movie-promo'>Add Movie Promotion </p>
          <form onSubmit ={editPromoHandler}>
            <label className='promo-txt'>Promotion Code</label>
            <input
              id="promotionCode"
              type="text"
              value = {enteredPromoCode}
              onChange = {(e)=> {setEnteredPromoCode(e.target.value)}}
              className='promo-input'
            />
            <label className='promo-txt'>Percentage (example: 60%)</label>
            <input
              id="percentage"
              type="text"
              value = {enteredPercentage}
              onChange = {(e)=> {setEnteredPercentage(e.target.value)}}
              className='promo-input'
            />
            <label className='promo-txt'>Promotion (example: .60)</label>
            <input
              id="promotionNumber"
              type="text"
              value = {enteredPercentageNumber}
              onChange = {(e)=> {setEnteredPercentageNumber(e.target.value)}}
              className='promo-input'
            />
            <label className='promo-txt'>Promotion Enddate</label>
            <input
              id="endDate"
              type="text"
              value = {enteredEndDate}
              onChange = {(e)=> {setEnteredEndDate(e.target.value)}}
              className='promo-input'
            />
            <div className='promo-btn-con'>
            <Button type="submit" className="promo-btn">Add Movie Promotion</Button>
            </div>
          </form>
          {/* </Card> */}
          </div>
          </div>

          <footer className="footer" style={{ backgroundColor: '#f5e9e6', marginTop: '0' }}>
            <p>© 2024 Dohee Kim. All rights reserved.</p>
          </footer>
        </div>
      );
    };
    
    export default EditPromoForm;
    