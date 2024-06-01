import React, { useState, useEffect, useRef } from 'react';
import MovieList from './MovieList';
import '../css/search.css';
import DatabaseInterface from '../DBInterface';
import arrow from '../assets/ar.png';
import photo1 from '../assets/photo1.jpeg';
import photo2 from '../assets/bb.jpg';
import p2 from '../assets/p2.jpeg';
import ticket from '../assets/aa2.png';
import p4 from '../assets/cc.jpg';
import p5 from '../assets/dd.jpg';

function Search({ movies, setMovies, onSearchComplete }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('title'); // Default search option
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [allRatings, setAllRatings] = useState([]);
    const searchContainerRef = useRef(null);
    const dbInterface = new DatabaseInterface();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchOptionChange = (option) => {
        setSearchOption(option);
    };
    
    useEffect(() => {
        const fetchRatings = async () => {
            dbInterface.getAllUsRatings().then((response) => {
                console.log(response);
                setAllRatings(response);
            });
        };

        fetchRatings();
    }, []);

    const handleSearch = () => {
        // Filter movies based on the search term and option
        const filtered = movies.filter(movie => {
            switch (searchOption) {
                case 'title':
                    return movie.movie_title.toLowerCase().includes(searchTerm.toLowerCase());
                case 'category':
                    return movie.movie_category.toLowerCase().includes(searchTerm.toLowerCase());
                case 'rating':
                    const ratingId = allRatings.find((rating) => rating.RatingCode === searchTerm.toUpperCase()); 
                    console.log(ratingId);
                    return movie.movie_rating.includes(ratingId?._id);
                case 'cast':
                    return movie.cast.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()));
                default:
                    alert("No Movies Found"); // Return all movies if search option is invalid
            }
        });

        setFilteredMovies(filtered);
        onSearchComplete(filtered); // Notify parent component about the search result

        // Reset min-height before setting new min-height
        if (searchContainerRef.current) {
            searchContainerRef.current.style.minHeight = 'auto';
        }
    };

    useEffect(() => {
        if (searchContainerRef.current && filteredMovies.length > 0) {
            searchContainerRef.current.style.minHeight = `${searchContainerRef.current.scrollHeight}px`;
        }
    }, [filteredMovies]);

    return (
        <div className={`search-container ${filteredMovies.length > 0 ? 'results' : ''}`} ref={searchContainerRef}>
            <div className='upper'>
                <div className='searchSec'>
                    <p className='searchtext'> Browse Movie<br /> in the Movie Sea </p>
                        <div className="search-bar-main">
                            <input 
                                type="text"
                                label="search"
                                placeholder="Search movies..."
                                value={searchTerm}
                                onChange={handleInputChange}
                                className='searchinput'
                            />
                            <button className='search-btn' onClick={handleSearch}><img src={arrow} alt="Search" className='arrow' /></button>
                        </div>
                        <div className="search-options">
                            <button 
                                className={`search-option-btn ${searchOption === 'title' ? 'active' : ''}`}
                                onClick={() => handleSearchOptionChange('title')}
                            >
                                Title
                            </button>
                            <button 
                                className={`search-option-btn ${searchOption === 'category' ? 'active' : ''}`}
                                onClick={() => handleSearchOptionChange('category')}
                            >
                                Category
                            </button>
                            <button 
                                className={`search-option-btn ${searchOption === 'rating' ? 'active' : ''}`}
                                onClick={() => handleSearchOptionChange('rating')}
                            >
                                Rating
                            </button>
                            <button 
                                className={`search-option-btn ${searchOption === 'cast' ? 'active' : ''}`}
                                onClick={() => handleSearchOptionChange('cast')}
                            >
                                Cast
                            </button>
                    </div>
                    {/* {filteredMovies.length > 0 && <p className='resulttext'>Search Results</p>} */}
                </div> 
                
                <div className='sec2'>
                    <div className='grid1'>
                        <p className='whymv'>Why We Need Movie</p>
                        <p className='whymvexp0'>Spectrum of Human Emotions</p>
                        <p className='exp0'> capture the full and diverse spectrum of human emotion, connect deeply<br></br> with various and profound feelings all<br></br> empathize with those of others </p>
                        <img src={photo2} alt="photo2" className="photo2" />
                    </div>
                   
                    <div className='grid2'>
                        <p className='iol'>In Our Daily Lives . . .</p>
                        <img src={ticket} alt="photo3" className="photo3" />
                        <p className='whymvexp'>Paint Canvas of Storytelling</p>
                        <p className='exp'> painting tales of human experience<br></br> with brushstrokes of light and sound</p>
                        <p className='whymvexp'>Travel to Fantastical Realms</p>
                        <p className='exp'> travel realms and distant worlds allow exploration beyond everyday reality</p>
                    </div>
                    <div className='grid3'>
                        <img src={p5} alt="photo4" className="photo4" />
                    </div>
                </div>
            </div>

            {/* Render MovieList with filtered movies */}
            <div className='mv_result'>
                <MovieList movies={filteredMovies} />
            </div>
        </div>
    );
}

export default Search;
