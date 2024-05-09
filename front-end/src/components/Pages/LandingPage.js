import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../MovieList';
import Search from '../Search';
import Header from '../Header';
import '../../css/LandingPages.css';
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

    return (
        <section>
            <Header />
            <br></br>
            <div>
                <p className='searchtext'> Search </p>
                <div className='search'><Search movies={movies} setMovies={setMovies}/></div>
                <p className='browse'>Browse All Movies</p>

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
                <MovieList movies={filteredMovies} openModal={openModal} onClose={closeModal} />
            
            </div>

            {/* <div className='links'>
            <div>
                <Link to="buyTickets">
                        Buy Ticket Page
                </Link>
            </div>
            <div>
                <Link to="orderSummary">
                        Order Summary Page
                </Link>
            </div>
            <div>
                <Link to="checkout">
                        Checkout Page
                </Link>
            </div>
            <div>
                <Link to="orderConfirmation">            
                        Order Confirmation Page      
                </Link>
            </div>
            <div>
                <Link to="editPromotions">             
                        Manage Promotions Page               
                </Link>
            </div>
            <div>
                <Link to="addMovies">
                       Manage Movies Page              
                </Link>
            </div>
            </div> */}
            {/* <MovieMoreInfoModal isOpen={modalOpen} onClose={closeModal} movie={selectedMovie} /> */}

        <footer className="footer">
            <p>© 2024 A6 Movie. All rights reserved.</p>
        </footer>

        </section>
    );
}

export default LandingPage;
