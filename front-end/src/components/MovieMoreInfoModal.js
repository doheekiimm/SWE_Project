import React from 'react';
import MovieMoreInfoPage from './Pages/MovieMoreInfoPage';
import '../css/MovieMoreInfoModal.css'; 

const MovieMoreInfoModal = ({ movie, isOpen, onClose }) => { // Ensure isOpen and onClose props are received
  return (
    <div className={isOpen ? "modal-overlay open" : "modal-overlay"}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>close</button>
        <MovieMoreInfoPage movie={movie} onClose={onClose} />
      </div>
    </div>
  );
};

export default MovieMoreInfoModal;
