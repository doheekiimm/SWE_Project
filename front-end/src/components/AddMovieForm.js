import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';
import DatabaseInterface from '../DBInterface';
import Header from './Header';
import '../css/AddMovieForm.css'
import EditMovieForm from './EditMovieForm';
const AddMovieForm = () => {
  const dbInterface = new DatabaseInterface();
  const [ratings, setRatings] = useState([]); // [ { rating: 'G', description: 'General Audiences' }, ...
  const fetchRatings = async () => {
    try {
      const rating = await dbInterface.getAllUsRatings();
      setRatings(rating);
      console.log('Ratings:', rating);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };
  useEffect(() => {
    fetchRatings();
  }, []);

  const [movieData, setMovieData] = useState({
    movie_title: '',
    movie_poster_url: 'src/assets/img/clapperboard.jpeg',
    movie_trailer_url: '',
    movie_category: '',
    movie_rating: 'G',
    cast: [],
    director: '',
    producer: '',
    synopsis: '',
    reviews: [],
    activeSection: 'comingSoon',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/movies', movieData);
      alert('Movie added successfully.');
      // Reset form fields
      setMovieData({
        movie_title: '',
        movie_poster_url: 'src/assets/img/clapperboard.jpeg',
        movie_trailer_url: '',
        movie_category: '',
        movie_rating: 'G',
        cast: [],
        director: '',
        producer: '',
        synopsis: '',
        reviews: [],
        activeSection: 'comingSoon',
      });
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Failed to add movie. Please try again later.');
    }
  };

  return (
    <div>
			<Header/>
    <div className="cover"> 
    <div className="manageMovieCard">
      <h2 className='mm'>Manage Movies</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Movie Title: 
          <input
            type="text"
            name="movie_title"
            value={movieData.movie_title}
            onChange={handleInputChange}
            className='mt_input'
          />
        </label>
        <label>
          Movie Poster URL:
          <input
            type="text"
            name="movie_poster_url"
            value={movieData.movie_poster_url}
            onChange={handleInputChange}
            className='poster_input'
          />
        </label>
        <label>
          Movie Trailer URL:
          <input
            type="text"
            name="movie_trailer_url"
            value={movieData.movie_trailer_url}
            onChange={handleInputChange}
            className='trail_input'
          />
        </label>
        <label>
          Movie Category:
          <input
            type="text"
            name="movie_category"
            value={movieData.movie_category}
            onChange={handleInputChange}
            className='cat_input'
          />
        </label>
        <label>
          Movie Rating:
          <select
            name="movie_rating"
            value={movieData.movie_rating}
            onChange={handleInputChange}
            className='rating_input'
          >
            {ratings.map(rating => (
              <option key={rating._id} value={rating._id}>{rating.RatingCode}</option>
            ))}
          </select>
          </label>
        <label>
          Cast:
          <input
            type="text"
            name="cast"
            value={movieData.cast.join(', ')}
            onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(', ') })}
            className='cast_input'
          />
        </label>
        <label>
          Director:
          <input
            type="text"
            name="director"
            value={movieData.director}
            onChange={handleInputChange}
            className='dir_input'
          />
        </label>
        <label>
          Producer:
          <input
            type="text"
            name="producer"
            value={movieData.producer}
            onChange={handleInputChange}
            className='prod_input'
          />
        </label>
        <label>
          Synopsis:
          <input
            type="text"
            name="synopsis"
            value={movieData.synopsis}
            onChange={handleInputChange}
            className='syn_input'
          />
        </label>
        <label>
          Active Section:
          <input
            type="text"
            name="activeSection"
            value={movieData.activeSection}
            onChange={handleInputChange}
            className='as_input'
          />
        </label>
        <button className="submit-button" type="submit">Add Movie</button>
      </form>
    </div>
    </div>
    <EditMovieForm />
  </div>
  );
};

export default AddMovieForm;
