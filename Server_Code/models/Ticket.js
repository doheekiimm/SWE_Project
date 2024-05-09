const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new mongoose.Schema({

    /*ticketID: { // {PK} primary key
        required: true,
        type: Number, 
        trim: true,
    },*/
    bookingID: { // {FK} foreign key
        type: Schema.Types.ObjectId,
        ref: 'Booking',
    },
    ticketTypeID: { // {FK} foreign key
        type: Schema.Types.ObjectId,
        ref: 'TicketTypePrices',
    },
    seatID: { // {fk} foreign key
        type: Schema.Types.ObjectId,
        ref: 'Seat',
    }
});

module.exports= Ticket = mongoose.model('ticket', ticketSchema);