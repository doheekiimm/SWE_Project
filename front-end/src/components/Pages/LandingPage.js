import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../MovieList';
import Search from '../Search';
import Header from '../Header';
import Movie from '../Movie';
import '../../css/LandingPages.css';
import Slider from "react-slick"; // Import Slider from react-slick
import "slick-carousel/slick/slick.css"; // Import slick styles
import "slick-carousel/slick/slick-theme.css"; 
import MovieMoreInfoModal from '../MovieMoreInfoModal';
import NewInfoModal from "../ModalNewInfo";
import { Link } from "react-router-dom";

const LandingPage = () => {
    const [movies, setMovies] = useState([]);
    const [activeSection, setActiveSection] = useState('nowPlaying');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        // Fetch movies from the API
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/movies');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []); // Run only once on component mount

    // Function to handle clicking on "Now Playing"
    const handleNowPlayingClick = () => {
        setActiveSection('nowPlaying');
    };

    // Function to handle clicking on "Coming Soon"
    const handleComingSoonClick = () => {
        setActiveSection('comingSoon');
    };

    // Function to open the modal and set the selected movie
    const openModal = (movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Filter movies based on activeSection
    const filteredMovies = movies.filter(movie => movie.activeSection === activeSection);

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section style={{ backgroundColor: '#f5e9e6' }}>
            <Header />
            <br></br>
            <div>
                <div className='search'><Search movies={movies} setMovies={setMovies}/></div>

                {/* Buttons for Now Playing and Coming Soon */}
                <ul className="ulStyles">
                    {/* <ul className="ulStyles1"> */}
                    {/* <a href='/#' 
                    className={activeSection === 'nowPlaying' ? "ulStyles1 activeLinkStyle" : "ulStyles1"}
                    onClick={handleNowPlayingClick}> 
                        Now Playing 
                    </a> */}
                    <li className={activeSection === 'nowPlaying' ? "ulStyles1 activeLinkStyle" : "ulStyles1"}>
                        <a href='#'
                        className="linkStyles"
                        onClick={handleNowPlayingClick}>
                        Now Playing
                        </a>
                    </li>
                    {/* </ul> */}
                    {/* <ul className="ulStyles2"> */}
                    {/* <a href='/#' 
                    className={activeSection === 'comingSoon' ? "ulStyles2 activeLinkStyle" : "ulStyles2"}
                    onClick={handleComingSoonClick}>
                        Coming Soon
                    </a> */}
                    {/* </ul> */}
                    <li className={activeSection === 'comingSoon' ? "ulStyles2 activeLinkStyle" : "ulStyles2"}>
                        <a href='#'
                        className="linkStyles"
                        onClick={handleComingSoonClick}>
                        Coming Soon
                        </a>
                    </li>
                </ul>
                
            </div>
            {/* Render MovieList with filtered movies */}
            <div>
                {/* <MovieList movies={filteredMovies} openModal={openModal} onClose={closeModal} /> */}
                <Slider {...settings} className="movie-slider">
                    {filteredMovies.map((movie) => (
                        <div key={movie._id} className="slider-item">
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
                                openModal={() => openModal(movie)} 
                            />
                        </div>
                    ))}
                </Slider>
            </div>

        <footer className="footer" style={{ backgroundColor: '#f5e9e6' }}>
            <p>© 2024 Dohee Kim. All rights reserved.</p>
        </footer>

        </section>
    );
}

export default LandingPage;
