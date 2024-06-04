// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import MovieMoreInfoPage from "./Pages/MovieMoreInfoPage";
// import NewInfoModal from "./ModalNewInfo";
// import "../css/Movie.css";
// import DatabaseInterface from "../DBInterface";
// function Movie(props) {
//   const [modalOpen, setModalOpen] = useState(false); // State to manage modal open/close
//   const [isFlipped, setIsFlipped] = useState(false); // State to track flip status
//   const [ratingString, setRatingString] = useState(""); // State to store rating string
//   const [newModalOpen, setNewModalOpen] = useState(false);
//   const dbInterface = new DatabaseInterface();
  

//   const fetchRatingString = async () => {
//       try {
//         const rating = await dbInterface.getUsRatingById(props.rating);
//         setRatingString(rating.RatingCode);
//       } catch (error) {
//         console.error("Error fetching rating:", error);
//       }
//     };
//     useEffect(() => {
//       fetchRatingString();
//     }, []);



//   // Function to open the modal
//   const openModal = () => {
//     setModalOpen(true);
//     // Turn off all effects when modal is open
//     setIsFlipped(false);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const openNewModal = () => {
//     setNewModalOpen(true); // Open the new modal
//   };

//   const closeNewModal = () => {
//     setNewModalOpen(false); // Close the new modal
//   };

//   // Function to flip the Poster-Container
//   const handleFlip = () => {
//     // Check if modal is open, return early if it is
//     if (modalOpen || newModalOpen) return;
//     setIsFlipped(!isFlipped);
//   };

//   // Function to handle More Info button click
//   const handleMoreInfoClick = () => {
//     openModal();
//   };

//   return (
//     <div className={`full-movie ${modalOpen ? "modal-open" : ""}`}>
//       <div className="title">
//         <p className="innerFormat_title">{props.title}</p>
//       </div>
//       <div className="movie-content">
//         <div className="left-section">
//           <div className="Poster-Container" onClick={handleFlip}>
//               <div className="Poster">
//                 <img
//                   src={props.poster}
//                   alt={props.poster}
//                   className="movie-poster"
//                 />
//               </div>
//               <div className="trailer">
//                 <iframe
//                   src={props.trailer}
//                   className="trailer"
//                   width="300px"
//                   height="400px"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//             </div>
//         </div>

//         <div className="right-section">
//           <div className="genre">
//             <p className="genretxt">Genre</p>
//             <div className="innerFormat">{props.category}</div>
//           </div>

//           <div className="rating">
//           <p className="ratingtxt">Rating</p>
//             <div className="innerFormat">{ratingString}</div>
//           </div>

//           <div
//             className={`content-container ${isFlipped && !modalOpen ? "flipped" : ""}`}
//           >

//             <button onClick={openNewModal} className="newInfoButton">
//               Movie Info
//             </button>
//             <div>
//               <Link to={`bookTickets/${props._id}`} className="buyTicketsBtn">
//                         Book Ticket
//               </Link>
//             </div>
//           </div>
//         </div>


//       {newModalOpen && (
//         <NewInfoModal movie={props} onClose={closeNewModal} />
//       )}
//     </div>
//     </div>
//   );
// }

// export default Movie;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import MovieMoreInfoPage from "./Pages/MovieMoreInfoPage";
// import NewInfoModal from "./ModalNewInfo";
// import "../css/Movie.css";
// import DatabaseInterface from "../DBInterface";
// function Movie(props) {
//   const [modalOpen, setModalOpen] = useState(false); // State to manage modal open/close
//   const [isFlipped, setIsFlipped] = useState(false); // State to track flip status
//   const [ratingString, setRatingString] = useState(""); // State to store rating string
//   const [newModalOpen, setNewModalOpen] = useState(false);
//   const [customModalOpen, setCustomModalOpen] = useState(false); // State for the new custom modal
//   const dbInterface = new DatabaseInterface();
  
//   const fetchRatingString = async () => {
//       try {
//         const rating = await dbInterface.getUsRatingById(props.rating);
//         setRatingString(rating.RatingCode);
//       } catch (error) {
//         console.error("Error fetching rating:", error);
//       }
//     };
//     useEffect(() => {
//       fetchRatingString();
//     }, []);

//   // Function to open the modal
//   const openModal = () => {
//     setModalOpen(true);
//     // Turn off all effects when modal is open
//     setIsFlipped(false);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const openNewModal = () => {
//     setNewModalOpen(true); // Open the new modal
//   };

//   const closeNewModal = () => {
//     setNewModalOpen(false); // Close the new modal
//   };

//   const openCustomModal = () => {
//     setCustomModalOpen(true); // Open the custom modal
//   };

//   const closeCustomModal = () => {
//     setCustomModalOpen(false); // Close the custom modal
//   };

//   // Function to flip the Poster-Container
//   const handleFlip = () => {
//     // Check if modal is open, return early if it is
//     if (modalOpen || newModalOpen || customModalOpen) return;
//     setIsFlipped(!isFlipped);
//   };

//   // Function to handle More Info button click
//   const handleMoreInfoClick = () => {
//     openModal();
//   };

//   return (
//     <div className={`full-movie ${modalOpen ? "modal-open" : ""}`}>
//       <div className="title">
//         <p className="innerFormat_title">{props.title}</p>
//       </div>
//       <div className="movie-content">
//         <div className="left-section">
//           <div className="Poster-Container" onClick={handleFlip}>
//               <div className="Poster">
//                 <img
//                   src={props.poster}
//                   alt={props.poster}
//                   className="movie-poster"
//                 />
//               </div>
//               <div className="trailer">
//                 <iframe
//                   src={props.trailer}
//                   className="trailer"
//                   width="300px"
//                   height="400px"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//             </div>
//         </div>

//         <div className="right-section">
//           <div className="genre">
//             <p className="genretxt">Genre</p>
//             <div className="innerFormat">{props.category}</div>
//           </div>

//           <div className="rating">
//           <p className="ratingtxt">Rating</p>
//             <div className="innerFormat">{ratingString}</div>
//           </div>

//           <div
//             className={`content-container ${isFlipped && !modalOpen ? "flipped" : ""}`}
//           >
//             <button onClick={openNewModal} className="newInfoButton">
//               Movie Info
//             </button>
//             <div>
//               <Link to={`bookTickets/${props._id}`} className="buyTicketsBtn">
//                         Book Ticket
//               </Link>
//             </div>
//             <div>
//               <button onClick={openCustomModal} className="customModalButton">
//                         Open Custom Modal
//               </button>
//             </div>
//           </div>
//         </div>

//         {newModalOpen && (
//           <NewInfoModal movie={props} onClose={closeNewModal} />
//         )}

//         {customModalOpen && (
//           <div className="customModalOverlay">
//             <div className="customModalContent">
//               <h2>Custom Modal</h2>
//               <p>This is the content of the custom modal.</p>
//               <button onClick={closeCustomModal}>Close</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Movie;
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MovieMoreInfoPage from "./Pages/MovieMoreInfoPage";
import NewInfoModal from "./ModalNewInfo";
import "../css/Movie.css";
import DatabaseInterface from "../DBInterface";

function Movie(props) {
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal open/close
  const [isFlipped, setIsFlipped] = useState(false); // State to track flip status
  const [ratingString, setRatingString] = useState(""); // State to store rating string
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false); // State for the new custom modal
  const [modalStyle, setModalStyle] = useState({}); // State for modal style
  const movieRef = useRef(null); // Ref to get the position and size of the movie item
  const dbInterface = new DatabaseInterface();

  const fetchRatingString = async () => {
    try {
      const rating = await dbInterface.getUsRatingById(props.rating);
      setRatingString(rating.RatingCode);
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };

  useEffect(() => {
    fetchRatingString();
  }, []);

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
    // Turn off all effects when modal is open
    setIsFlipped(false);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const openNewModal = () => {
    setNewModalOpen(true); // Open the new modal
  };

  const closeNewModal = () => {
    setNewModalOpen(false); // Close the new modal
  };

  const openCustomModal = () => {
    const rect = movieRef.current.getBoundingClientRect();
    setModalStyle({
      position: 'absolute',
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      background: '#fff',
      zIndex: 1000,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      borderRadius: '8px',
    });
    setCustomModalOpen(true); // Open the custom modal
  };

  const closeCustomModal = () => {
    setCustomModalOpen(false); // Close the custom modal
  };

  // Function to flip the Poster-Container
  const handleFlip = () => {
    // Check if modal is open, return early if it is
    if (modalOpen || newModalOpen || customModalOpen) return;
    setIsFlipped(!isFlipped);
  };

  // Function to handle More Info button click
  const handleMoreInfoClick = () => {
    openModal();
  };

  return (
    <div ref={movieRef} className={`full-movie ${modalOpen ? "modal-open" : ""}`}>
      <div className="title">
        <p className="innerFormat_title">{props.title}</p>
      </div>
      <div className="movie-content">
        <div className="left-section">
          <div className="Poster-Container" onClick={handleFlip}>
            <div className="Poster">
              <img
                src={props.poster}
                alt={props.poster}
                className="movie-poster"
              />
            </div>
            <div className="trailer">
              <iframe
                src={props.trailer}
                className="trailer"
                width="300px"
                height="400px"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="genre">
            <p className="genretxt">Genre</p>
            <div className="innerFormat">{props.category}</div>
          </div>

          <div className="rating">
            <p className="ratingtxt">Rating</p>
            <div className="innerFormat">{ratingString}</div>
          </div>

          <div
            className={`content-container ${
              isFlipped && !modalOpen ? "flipped" : ""
            }`}
          >
            <button onClick={openNewModal} className="newInfoButton">
              Movie Info
            </button>
            <div>
              <Link to={`bookTickets/${props._id}`} className="buyTicketsBtn">
                Book Ticket
              </Link>
            </div>
            <div>
              <button onClick={openCustomModal} className="customModalButton">
                Open Custom Modal
              </button>
            </div>
          </div>
        </div>

        {newModalOpen && <NewInfoModal movie={props} onClose={closeNewModal} />}

        {customModalOpen && (
          <div className="customModalOverlay">
            <div className="customModalContent" style={modalStyle}>
              <h2>Custom Modal</h2>
              <p>This is the content of the custom modal.</p>
              <button onClick={closeCustomModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Movie;
