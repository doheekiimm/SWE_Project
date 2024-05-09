const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieShowSchema = new mongoose.Schema({

    movieID: {// {FK} foregin key
        type: Schema.Types.ObjectId,
        ref: 'Movie',
    },
    auditoriumID: { //{FK} foregin key
        type: Schema.Types.ObjectId,
        ref: 'Auditorium',
    },
    showTimeID: {
        required: true,
        type: Schema.Types.ObjectId, // in the Showtime models this is a String, look at the enumeration
        trim: true,
    },
    numberOfAvailableSeats: {
        required: true,
        type: Number, 
        trim: true,
    },
});

module.exports= MovieShow = mongoose.model('movieshow', movieShowSchema);