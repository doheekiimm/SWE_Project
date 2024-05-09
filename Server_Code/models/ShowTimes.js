const mongoose = require("mongoose");

const showTimeSchema = new mongoose.Schema({
    /*showTimeID: { // {PK} primary key
        required: true,
        type: Number, // could aslo be a string
        trim: true,
    },*/
    /*
    timeStamp:{
        required: true,
        type: String, 
        trim: true,
    }
    */
   // was unsure what she wanted but it seemed best to be a enumeration, subject to change
    timeStamp:{
        type: String,
        enum : ['12-3','3-6','6-9','9-12',],
        default: '12-3',
    }
    //TA said this is missing something, not sure what.
});

module.exports= ShowTime = mongoose.model('showtime', showTimeSchema);
//maps movies with showtime, dates, times, auditorium, movie ID 