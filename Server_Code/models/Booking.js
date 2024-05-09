const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
/*
    bookingID: { // {PK} primary key
        required: true,
        type: Number, // could aslo be a string
        trim: true,
    },*/
    userId: { // {FK} foreign Key
        type: Schema.Types.ObjectId,
        ref: 'User',
        Unique:false,
    },
    movieShowID: { // {FK} foreign key
        type: Schema.Types.ObjectId,
        ref: 'MovieShow',
    },
    showTimeID: { // {FK} foreign key
        type: Schema.Types.ObjectId,
        ref: 'ShowTimes',
    }, 
    cardID: { // {FK} foreign key
        type: Schema.Types.ObjectId,
        ref: 'PaymentCard',
    },
    numberOfTickets: {
        required: true,
        type: Number,
        trim: true,  
    },
    totalPrice: {
        required: true,
        type: Number,
        trim: true,
    },
    promoID: { // {FK} foreign key
        //required: true, // can have no promo
        type: Schema.Types.ObjectId,
        ref: 'Promotion',
    }
});

module.exports= Booking = mongoose.model('booking', bookingSchema);