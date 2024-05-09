import React, { useState } from 'react';
import Movie from './Movie';
import MovieMoreInfoModal from './MovieMoreInfoModal';
import '../css/MovieList.css'; // Import CSS file for movie list styles

function MovieList(props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Function to open the modal and set the selected movie
    const openModal = (movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <div className="movie-list-container">
                {props.movies.map((movie) => (
                    <div key={movie._id} className="movie-item">
                        <Movie
                            title={movie.movie_title}
                            category={movie.movie_category}
                            rating={movie.movie_rating}
                            poster={movie.movie_poster_url}
                            trailer={movie.movie_trailer_url}
                            cast={movie.cast}
                            director={movie.director}
                            producer={movie.producer}
                            synopsis={movie.synopsis}
                            showDates={movie.show_dates}
                            showTimes={movie.show_times}
                            ticketPrice={movie.ticket_price}
                            _id={movie._id}
                            openModal={() => openModal(movie)} // Pass openModal function as prop
                        />
                    </div>
                ))}
            </div>
            {/* <MovieMoreInfoModal isOpen={modalOpen} onClose={closeModal} movie={selectedMovie} /> */}
        </div>
    );
}

export default MovieList;
