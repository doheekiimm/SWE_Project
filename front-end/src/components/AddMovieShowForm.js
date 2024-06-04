import React, { useState, useEffect, useContext, useMemo } from 'react';
import Card from './Card';
import Button from './Button';
import '../css/AddMovieShowForm.css';
//import axios from 'axios';
import DatabaseInterface from '../DBInterface'; 
import UserContext from '../context/UserContext';
import Header from './Header';
const AddMovieShowForm = props => {
    ////////////////////////////////////////////////////////////////////

    const [allMovies, setAllMovies] = useState([]); 
    const [allAuditoriums, setAllAuditoriums] = useState([]);
    const [allShowTimes, setAllShowTimes] = useState([]);
    // seats go here? Dont think so, but not sure how its going to be implemented
    const dbInterface = new DatabaseInterface();
    ////////////////////////////////////////////////////////////////////
    const[enteredMovie,setEnteredMovie] = useState('')
    const[enteredAuditorium,setEnteredAuditorium] = useState('')
    const[enteredShowTime,setEnteredShowTime] = useState('')
    const[auditoriumId,setAuditoriumId] = useState('')
    const[selectedAuditoriumData,setSelectedAuditoriumData] = useState('')
    const [loadingCreateAuditorium, setLoadingCreateAuditorium] = useState(false);
    const [loadingPostMovieShow, setLoadingPostMovieShow] = useState(false);
    const[loadingGetAuditoriumData, setLoadingGetAuditoriumData] = useState(false);
    const[allMovieShows, setAllMovieShows] = useState([])
    const {userData} = useContext(UserContext);
    const userId = userData.user.id; 
    ////////////////////////////////////////////////////////////////////
    //DatabaseCalls to retrive data//
      ////////////////////////////////////////////////////////////////////
    
      useEffect (() => {
      const fetchMovies = async() => {
        try {
          const movieList = await dbInterface.getAllMovies( )
          console.log('hello there fair traveler, you have displayed all movies') 
          console.log("MovieList: ", movieList)
          setAllMovies(movieList)
        }catch(error){console.error('Error fetching movie list:', error);}
        };
      
        ////////////////////////////////////////////////////////////////////
        const fetchAuditoriums = async() => {
        try {
          const auditoriumList = await dbInterface.getAllAuditoriums()
          console.log("Auditoriums: ", auditoriumList)
          setAllAuditoriums(auditoriumList)
        } catch(error){console.error('Error fetching auditorium list:', error);}
        };
        fetchAuditoriums();
        ////////////////////////////////////////////////////////////////////
        const fetchShowTimes = async() => {
        try{
          const showTimeList = await dbInterface.getAllShowTimes()
          console.log("Show Times: ", showTimeList)
          setAllShowTimes(showTimeList)
        } catch(error){console.error('Error fetching showTime list:', error);}
        };
        const fetchMovieShows = async() => {
          try{
            const movieShowList = await dbInterface.getAllMovieShows()
            console.log("Movie Shows: ", movieShowList)
            setAllMovieShows(movieShowList)
          } catch(error){console.error('Error fetching movieShow list:', error);}
          };
      fetchMovieShows();    
      fetchMovies();
      fetchAuditoriums();
       fetchShowTimes();
   }, [] );

   function checkTimeConflict(showTimeID, auditoriumName) {
    const auditorium = allAuditoriums.find(auditorium => auditorium.auditoriumName === auditoriumName);
    if (!auditorium) {
        // If the auditorium doesn't exist, there can't be a time conflict
        return true;
    }

    // Check if there's any existing movie show with the same show time and auditorium
    const conflict = allMovieShows.some(movieShow =>
        movieShow.showTimeID === showTimeID && movieShow.auditoriumName === auditoriumName
    );

    // Return true if there's no conflict, false if there is
    return !conflict;
}

      
      // Database Calls to send Data
      ////////////////////////////////////////////////////////////////////
      const postMovieShow = (e) => {
        e.preventDefault();
    
        if (enteredMovie.trim().length === 0 || enteredAuditorium.trim().length === 0 || enteredShowTime.trim().length === 0) {
            alert('Please enter a valid input for each field.');
            return;
        }
    
        // Create an auditorium with seats to house the movie show
        setLoadingCreateAuditorium(true);
        console.log('All Auditoriums:', allAuditoriums);
    
        const auditoriumData = allAuditoriums.find(auditorium => auditorium._id === enteredAuditorium);
        console.log('Auditorium Data:', auditoriumData);
    
        setSelectedAuditoriumData(auditoriumData);
        console.log('Selected Auditorium Data:', selectedAuditoriumData);
    
        const auditoriumCreate = {
            auditoriumName: selectedAuditoriumData.auditoriumName,
            numberOfSeats: selectedAuditoriumData.numberOfSeats,
            seatRow: selectedAuditoriumData.seatRow,
            seatColumn: selectedAuditoriumData.seatColumn,
        };
    
        console.log('Creating auditorium: ', auditoriumCreate);
    
        // Create a promise for creating the auditorium
        const createAuditoriumPromise = new Promise((resolve, reject) => {
            dbInterface.createAuditorium(auditoriumCreate)
                .then(response => {
                    console.log('New Auditorium:', response);
                    console.log('Auditorium ID from response:', response.auditorium._id);
                    setAuditoriumId(response.auditorium._id);
                    console.log('Auditorium ID:', auditoriumId);
                    setLoadingCreateAuditorium(false);
                    resolve(auditoriumId);
                })
                .catch(error => {
                    console.error('Error Posting auditorium:', error);
                    reject(error);
                });
        });
    
        // Create a promise for posting the movie show
        const postMovieShowPromise = createAuditoriumPromise.then(() => {
            setLoadingPostMovieShow(true);
            console.log('Entered Movie:', enteredMovie);
            console.log('Entered Auditorium:', enteredAuditorium);
            console.log('Entered ShowTime:', enteredShowTime);
            console.log('Auditorium ID:', auditoriumId);
    
            const newMovieShow = {
                movieID: enteredMovie,
                auditoriumID: auditoriumId,
                showTimeID: enteredShowTime,
                numberOfAvailableSeats: selectedAuditoriumData.numberOfSeats,
            };
           if( checkTimeConflict(newMovieShow.showTimeID, selectedAuditoriumData.auditoriumName)) {
            console.log('Posting movie show:', newMovieShow);
            
            // Return a promise for posting the movie show
            return dbInterface.createMovieShow(newMovieShow);
           } else
            {
              alert('There is a time conflict with the selected showtime and auditorium.');
              return Promise.reject('Time conflict');
            } 
        });
    
        // Chain the promises and handle errors
        postMovieShowPromise
            .then(movieShow => {
                console.log(movieShow);
                
                /*setEnteredMovie('');
                setEnteredAuditorium('');
                setEnteredShowTime('');
                setAuditoriumId('');
                setSelectedAuditoriumData('');
                */
                setLoadingPostMovieShow(false);
                alert('Movie show added successfully.');
            })
            .catch(error => {
                console.error('Error Posting movie show:', error);
                if(auditoriumId) {
                    dbInterface.deleteAuditorium(auditoriumId)
                        .then(() => console.log('Auditorium deleted.'))
                        .catch(() => console.error('Error deleting auditorium.'));
                }
            });
    };
      
       

      ////////////////////////////////////////////////////////////////////
    
   
      return (
        <section>
          <Header/>
        <div className='addMvShowFormCover'>
        <div className="add-movie-show-form">
        {/* <Card className="input"> */}
          <p className='addMovieShow'>Add Movie Show</p>
          <form onSubmit ={postMovieShow}>  
            <label className='addmvshow'>Movie</label>
            <select //className='selectbox'
            //value = {allMovies}
            onChange = {(e)=> {setEnteredMovie(e.target.value)}}
            style = {{width: '500px', height: '40px'}}
            >
              <option value ="">Select a Movie</option>
              {allMovies.map((movie) => (  
              <option key= {movie._id} value={movie._id}>
                {movie.movie_title}
              </option>
              ))}
            </select>

            <label className='addmvshow'>Auditorium</label>
            <select //className='selectbox'
            //value = {allAuditoriums}
            onChange = {(e)=> {setEnteredAuditorium(e.target.value)}}
            style = {{width: '500px', height: '40PX'}}
            >
              <option value ="">Select a Auditorium</option>
              {allAuditoriums.map((auditorium) => ( 
              <option key= {auditorium._id} value={auditorium._id}>
                {auditorium.auditoriumName}
              </option>
              ))}
            </select>

            <label className='addmvshow'>Showtime</label>
            <select //className='selectbox'
            //value = {allShowTimes}
            onChange = {(e)=>{setEnteredShowTime(e.target.value)}}
            style = {{width: '500px', height: '40PX'}}
            >
              <option value ="">Select a Showtime</option>
              {allShowTimes.map((showTime) => (
              <option key= {showTime._id} value={showTime._id}>
                {showTime.timeStamp}
              </option>
               ))}
            </select>
            <Button type="submit" className="submit-button">Add Movie Show</Button>
          </form>
        {/* </Card> */}
          </div>
          </div>
        
          <footer className="footer" style={{ backgroundColor: '#f5e9e6', marginTop: '0' }}>
                <p>© 2024 Dohee Kim. All rights reserved.</p>
            </footer>
        </section>
      );
    };
    
    export default AddMovieShowForm;