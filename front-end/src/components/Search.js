import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import '../css/search.css';
import DatabaseInterface from '../DBInterface';
import arrow from '../assets/ar.png';
import photo1 from '../assets/photo1.jpeg';
import photo2 from '../assets/ph3.jpeg';

function Search({ movies, setMovies }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('title'); // Default search option
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [allRatings, setAllRatings] = useState([]);
    const dbInterface = new DatabaseInterface();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchOptionChange = (option) => {
        setSearchOption(option);
    };
    
    useEffect(() => {
    const fetchRatings= async ()  => {
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
                const ratingId=  allRatings.find((rating) => rating.RatingCode === searchTerm.toUpperCase()); 
                console.log(ratingId);
                return movie.movie_rating.includes(ratingId._id);
                case 'cast':
                    return movie.cast.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()));
                default:
                    alert("No Movies Found"); // Return all movies if search option is invalid
            }
        });

        // Update the filteredMovies state with filtered movies
        setFilteredMovies(filtered);
    };

    return (
        <div className="search-container">
            <div className='upper'>
                <div className='searchSec'>
                    <p className='searchtext'> Browse Movie<br /> in the Movie Sea </p>
                        <div className = "search-bar-main">
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
                    {/* <p className='resulttext'>Search Results</p> */}
                    {filteredMovies.length > 0 && <p className='resulttext'>Search Results</p>}
                </div> 
                
                <div className='sec2'>
                    <div className='grid1'>
                        <p className='whymv'>Why We Need<br></br>Movie in Life?</p>
                        <img src={photo1} alt="photo1" className="photo1" />
                    </div>
                   
                    <div className='grid2'>
                        <img src={photo2} alt="photo2" className="photo2" />
                        <p className='whymvexp'>Canvas of Storytelling</p>
                        <p className='exp'>painting vivid tales of human experience with the brushstrokes of light and sound</p>
                        <p className='whymvexp'>Spectrum of Emotions</p>
                        <p className='exp'>capture spectrum of human emotions connect with feelings and those of others</p>
                        <p className='whymvexp'>Travel to Fantastical Realms</p>
                        <p className='exp'>travel to fantastical realms and distant worlds allowing exploration beyond reality</p>
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
