import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import '../css/CheckOutForm.css';
//import axios from 'axios';

const AddTicketForm = props => {
    const[enteredPromotionCode,setEnteredPromotion] = useState('')
    

    const addPromoCodeHandler = async event => {
      // prevents page refresh
        event.preventDefault();
    
      const newPromotion ={
        promo: enteredPromotionCode
        
      };
      //clears form
      setEnteredPromotion('');
      
      props.onAddPromoCode(newPromotion);
    
    }
      return (
        <Card className="input">
          <h1>Check Out</h1>
          <h2>Order Total: $56.69 (Sample)</h2>
          <form onSubmit ={addPromoCodeHandler}>
            <label>Enter Promotion Code</label>
            <input
              id="prom"
              type="text"
              value = {enteredPromotionCode}
              onChange = {(e)=> {setEnteredPromotion(e.target.value)}}
            />
            <Button type="submit" className="confirm">Confirm Order</Button>
            <Button type="submit" className="cancel">Cancel Order</Button>
          </form>
        </Card>
      );
    };
    
    export default AddTicketForm;