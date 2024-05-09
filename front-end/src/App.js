//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddMovieForm from './components/AddMovieForm';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import EditProfileForm from './components/EditProfile';
import EditPromoForm from './components/EditPromoForm';
import BuyTicketForm from './components/BuyTicketForm';
import BookTicketPage from './components/BookTicketPage';
import CheckoutForm from './components/CheckOutForm';
import OrderConfirmation from './components/OrderConfirmationPage';
import LandingPage from './components/Pages/LandingPage';
import AdminView from './components/AdminView';
import MovieMoreInfoPage from './components/Pages/MovieMoreInfoPage'
import LoginConfirmation from './components/Pages/LoginConfirmation';
import MovieShowForm from './components/AddMovieShowForm';
import {useState, useEffect} from 'react';
import UserContext from './context/UserContext';
import SignUpConfirmation from './components/SignUpConfirmation';
import OrderHistoryPage from './components/OrderHistoryPage';
export default function App() {

const [userData, setUserData] = useState({
token: undefined,
user: undefined,
});

useEffect( () => {
const checkLoggedIn = async () => {
let token = localStorage.getItem("auth-token");
if (token === null) {
localStorage.setItem("token", "");
token = "";
}


const tokenResponse = await axios.post(
  "http://localhost:4000/api/users/tokenIsValid",
null,
{ headers: { "x-auth-token": token } }
);

if (tokenResponse.data) {
const userRes = await axios.get("http://localhost:4000/api/users/tokenIsValid", {
headers: { "x-auth-token": token },
});

setUserData({
token,
user: userRes.data,
});
}
};
checkLoggedIn();
}, []);

  return (
    <UserContext.Provider value = {{userData, setUserData}}>
      <Routes>
          <Route path = "/" element = {<LandingPage/>}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/register" element={<SignUpForm />}></Route>
          <Route path="/profile" element={<EditProfileForm />}></Route>
          <Route path="/bookTickets/:movieId" element={<BookTicketPage />} />
          <Route path="/checkout" element={<CheckoutForm />}></Route>
          <Route path="/addMovies" element={<AddMovieForm />}></Route>
          <Route path="/editPromotions" element={<EditPromoForm />}></Route>
          <Route path="//addMovieShow" element={<MovieShowForm/>}></Route>
          <Route path="/adminView" element={<AdminView />}></Route>
          <Route path="/movie/:id" element={<MovieMoreInfoPage />} />
          <Route path='/LoginConfirmation' element={<LoginConfirmation />} />
          <Route path="/orderConfirm" element={<OrderConfirmation />} />
          <Route path="/SignUpConfirmation/:userId"element={<SignUpConfirmation/>}/>
          <Route path="/orderHistory" element={<OrderHistoryPage />} />
      </Routes>
      </UserContext.Provider>
  );
}

