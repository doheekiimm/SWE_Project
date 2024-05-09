import React from 'react'; 
import { Link } from 'react-router-dom';
import '../../css/MovieMoreInfoPage.css';

const MovieMoreInfoPage = ({ movie, onClose }) => {
  if (!movie || !movie.cast) {
    return <div>Loading...</div>; // or handle the missing data in another way
  }

  // Function to close both the MovieMoreInfoPage and the modal
  const handleClose = () => {
    onClose(); // Close the modal
  };

  return (
    <div className="movie-more-info-page">
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>Close</button>
        
        <div className="movie-info-header">
          <div className="poster-trailer">
            <img src={movie.poster} alt={movie.title} className="poster" />
            <iframe
              width="886"
              height="500"
              src={movie.trailer}
              title="Movie Trailer"
              className="trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="movie-details-container">
          <dl className="movie-info-list">
            <div className="movie-info-heading">Movie Details</div>
            <div>
              <dt className="movie-info-term">Category:</dt>
              <dd className="movie-info-definition">{movie.category}</dd>
            </div>
            <div>
              <dt className="movie-info-term">Rating:</dt>
              <dd className="movie-info-definition">{movie.rating}</dd>
            </div>
            <div>
              <dt className="movie-info-term">Cast:</dt>
              <dd className="movie-info-definition">{movie.cast.join(', ')}</dd>
            </div>
            <div>
              <dt className="movie-info-term">Director:</dt>
              <dd className="movie-info-definition">{movie.director}</dd>
            </div>
            <div>
              <dt className="movie-info-term">Producer:</dt>
              <dd className="movie-info-definition">{movie.producer}</dd>
            </div>
            <div>
              <dt className="movie-info-term">Synopsis:</dt>
              <dd className="movie-info-definition">{movie.synopsis}</dd>
            </div>
            {/* Add more fields here as needed */}
          </dl>
        </div>
        
        <div className="book-tickets-button-container">
          <Link to="/BookTicketPage" className="book-ticket-button">
            Book Tickets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieMoreInfoPage;