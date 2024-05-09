import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatabaseInterface from '../DBInterface';
import Header from './Header';
import '../css/AddMovieForm.css';
import Card from './Card';
import '../css/EditMovieForm.css';
const EditMovieForm = () => {
  const dbInterface = new DatabaseInterface();
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [movieData, setMovieData] = useState({
    movie_title: '',
    movie_poster_url: '',
    movie_trailer_url: '',
    movie_category: '',
    movie_rating: '',
    cast: [],
    director: '',
    producer: '',
    synopsis: '',
    activeSection: '',
  });
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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await dbInterface.getAllMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    setSelectedMovieId(selectedId);
    const selectedMovie = movies.find((movie) => movie._id === selectedId);
    setMovieData(selectedMovie);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dbInterface.updateMovie(selectedMovieId, movieData);
      alert('Movie updated successfully.');
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Failed to update movie. Please try again later.');
    }
  };

  return (
   <section>
   <div>
        <br />
      <div className="cover">
        <Card className="manageMovieCard">
          <h2 className='mm'>Edit Movie</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Select Movie to Edit:
              <select value={selectedMovieId} onChange={handleSelectChange}>
                <option value="">Select a Movie</option>
                {movies.map(movie => (
                  <option key={movie._id} value={movie._id}>{movie.movie_title}</option>
                ))}
              </select>
            </label>
       
            {/* Example: */}
            <label>
              Movie Title:
              <input
                type="text"
                name="movie_title"
                value={movieData.movie_title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Movie Poster URL:
              <input
                type="text"
                name="movie_poster_url"
                value={movieData.movie_poster_url}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Movie Trailer URL:
              <input
                type="text"
                name="movie_trailer_url"
                value={movieData.movie_trailer_url}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Movie Category:
              <input
                type="text"
                name="movie_category"
                value={movieData.movie_category}
                onChange={handleInputChange}
              />
            </label>
            <label>
          Movie Rating:
          <select
            name="movie_rating"
            value= {movieData.movie_rating}     
            onChange={handleInputChange}
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
                value={movieData.cast}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Director:
              <input
                type="text"
                name="director"
                value={movieData.director}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Producer:
              <input
                type="text"
                name="producer"
                value={movieData.producer}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Synopsis:
              <input
                type="text"
                name="synopsis"
                value={movieData.synopsis}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Active Section:
              <input
                type="text"
                name="activeSection"
                value={movieData.activeSection}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button className="submit-button" type="submit">Update Movie</button>
          </form>
        </Card>
      </div>
    </div>
    </section>
  );
};

export default EditMovieForm;
