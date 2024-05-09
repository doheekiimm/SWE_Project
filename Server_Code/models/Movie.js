const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Define _id as ObjectId
  movie_title: {
        type: String,
        required: true,
      },
      movie_poster_url: {
        type: String,
        default: 'src/assets/img/clapperboard.jpeg',
      },
      movie_trailer_url: {
        type: String, 
        default: '',
      },
      movie_category: {
        type: String
    },
    movie_rating: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'USRating',
  },
  duration: { 
    type: Number,
  },
    cast: {
        type: [String] 
    },
    director: {
        type: String
    },
    producer: {
        type: String
    },
    synopsis: {
        type: String
    },
    reviews: {
        type: [
            {
                reviewer: String,
                rating: Number,
                comment: String
            }
        ]
    },
      activeSection: {
        type: String, 
        default: 'comingSoon'
      }, 
})

const Movies = mongoose.model('Movie', movieSchema);
module.exports= Movies;