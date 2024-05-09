// NewInfoModal.js to
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NewInfoModal.css';

const NewInfoModal = ({ movie, onClose }) => {
  return (
    <div className="movie-more-info-page1">
      <div className="modal-content1">
        
        <div className="movie-info-header1">
          <div className="poster-trailer1">
            <img src={movie.poster} alt={movie.title} className="poster1" />
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
        <div className="movie-details-container1">
          <dl className="movie-info-list1">
            <div className="movie-info-heading1">Movie Details</div>
            <div>
              <dt className="movie-info-term1">Category:</dt>
              <dd className="movie-info-definition1">{movie.category}</dd>
            </div>
            <div>
              <dt className="movie-info-term1">Rating:</dt>
              <dd className="movie-info-definition1">{movie.rating}</dd>
            </div>
            <div>
              <dt className="movie-info-term1">Cast:</dt>
              <dd className="movie-info-definition1">{movie.cast.join(', ')}</dd>
            </div>
            <div>
              <dt className="movie-info-term1">Director:</dt>
              <dd className="movie-info-definition1">{movie.director}</dd>
            </div>
            <div>
              <dt className="movie-info-term1">Producer:</dt>
              <dd className="movie-info-definition1">{movie.producer}</dd>
            </div>
            <div>
              <dt className="movie-info-term1">Synopsis:</dt>
              <dd className="movie-info-definition1">{movie.synopsis}</dd>
            </div>
            {/* Add more fields here as needed */}
          </dl>
        </div>
        
        <button onClick={onClose} className='closeBtn'>Close</button>
      </div>
    </div>
  );
};

export default NewInfoModal;