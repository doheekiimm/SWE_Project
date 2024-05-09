import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import '../css/search.css';
import DatabaseInterface from '../DBInterface';
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
          <div className = "search-bar-main">
           
           <input 
                type="text"
                label="search"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleInputChange}
                className='searchinput'
            />
            <button className='search-btn' onClick={handleSearch}>Search</button>
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


            {/* Render MovieList with filtered movies */}
            <p className='resulttext'>Search Results:</p>
            <MovieList movies={filteredMovies} />
        </div>
    );
}

export default Search;
