const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new mongoose.Schema({
    /*seatID: { // {PK} primary key
        required: true,
        type: Number, // could aslo be a String
        trim: true,  
    },*/
    auditoriumID: { // {FK} foreign key
        type: Schema.Types.ObjectId,
        ref: 'Auditorium',
    },
     isTaken: {
        type:Boolean
     },
     seatRow: {
        type: Number,
        required: true,
        trim: true,
     },
     seatColumn: {
        type: Number,
        required: true,
        trim: true,
     } 
});

module.exports= Seat = mongoose.model('seat', seatSchema);