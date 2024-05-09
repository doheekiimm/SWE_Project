const mongoose = require("mongoose");

const auditoriumSchema = new mongoose.Schema({
/*auditoriumID: { {pirmary key}
    required: true,
    type: Number, // could aslo be a string
    trim: true,
},*/
auditoriumName: {
    required: true,
    type: String, 
    trim: true, 
},
numberOfSeats: {
    required: true,
    type: Number, // could aslo be a string 
    trim: true,  
},
seatRow: {
    required: true,
    type: Number, // could aslo be a string 
    trim: true, 
},
seatColumn: {
    required: true,
    type: Number, // could aslo be a string 
    trim: true, 
}

});

module.exports= Auditorium = mongoose.model('auditorium', auditoriumSchema);