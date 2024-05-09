const mongoose = require("mongoose");

const ticketTypePricesSchema = new mongoose.Schema({

    /*ticketTypeID: { // {PK} primary key
        required: true,
        type: Number, // could aslo be a string
        trim: true,
    },*/
    type: {
        required: true,
        type: String, 
        trim: true, 
    },
    price: {
        required: true,
        type: Number, 
        trim: true, 
    }
});

module.exports= TicketTypePrices = mongoose.model('ticketTypePrices', ticketTypePricesSchema);