const mongoose = require("mongoose");

const usRatingSchema = new mongoose.Schema({
/*ratingID: { // {PK} primary key
    required: true,
    type: Number, // could aslo be a string
    trim: true,
},*/
RatingCode:{
    type: String,
    enum : ['G','PG','PG-13','R','NC-17'],
    default: 'G',
}
});

module.exports= USRating = mongoose.model('usRating', usRatingSchema);