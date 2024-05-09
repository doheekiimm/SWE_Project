// DatabaseInterface.js

import axios from 'axios';

class DatabaseInterface {
  constructor() {
    this.baseUrl = 'http://localhost:4000/api';

  }

  // Auditoriums
  async getAllAuditoriums() {
    try {
      const response = await axios.get(`${this.baseUrl}/auditorium`);
      return response.data;
    } catch (error) {
      console.error('Error fetching auditoriums:', error);
      throw error;
    }
  }

  async getAuditoriumById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/auditorium/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching auditorium by ID:', error);
      throw error;
    }
  }
  async createAuditorium(auditoriumData) {
    try {
      const response = await axios.post(`${this.baseUrl}/auditorium`, auditoriumData);
      return response.data;
    } catch (error) {
      console.error('Error creating auditorium:', error);
      throw error;
    }
  }
  async deleteAuditorium(auditoriumData) {
    try {
      const response = await axios.delete(`${this.baseUrl}/auditorium`, auditoriumData);
      return response.data;
    } catch (error) {
      console.error('Error deleting auditorium:', error);
      throw error;
    }
  }


  // Bookings
  async getAllBookings() {
    try {
      const response = await axios.get(`${this.baseUrl}/booking`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  async getBookingById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/booking/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking by ID:', error);
      throw error;
    }
  }
    // fetch bookings by userID
    async getBookingsByUserId(userId) {
      try {
          const response = await axios.get(`${this.baseUrl}/booking`);
          console.log(response);
          const userBookings = response.data.filter(booking => booking.userId === userId);
          return userBookings;
      } catch (error) {
          console.error('Error fetching bookings by user ID:', error);
          throw error;
      }
    }
  async createBooking(bookingData) {
    try {
      const response = await axios.post(`${this.baseUrl}/booking`, bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }
  async updateMovie(id, movieData) {
    try {
      const response = await axios.put(`${this.baseUrl}/movies/${id}`, movieData);
      return response.data;
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
  }

  // Movies
  async getAllMovies() {
    try {
      const response = await axios.get(`${this.baseUrl}/movies`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }

  async getMovieById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
      throw error;
    }
  }
  async createMovie(movieData) {
    try {
      const response = await axios.post(`${this.baseUrl}/movies`, movieData);
      return response.data;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  }

  // Movie Shows
  async getAllMovieShows() {
    try {
      const response = await axios.get(`${this.baseUrl}/movieShow`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie shows:', error);
      throw error;
    }
  }

  async getMovieShowById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/movieShow/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie show by ID:', error);
      throw error;
    }
  }
  async createMovieShow(movieShowData) {
    try {
      const response = await axios.post(`${this.baseUrl}/movieShow`, movieShowData);
      return response.data;
    } catch (error) {
      console.error('Error creating movie show:', error);
      throw error;
    }
  }
  async updateMovieShow(id, movieShowData) {
    try {
      const response = await axios.put(`${this.baseUrl}/movieShow/${id}`, movieShowData);
      return response.data;
    } catch (error) {
      console.error('Error updating movie show:', error);
      throw error;
    }
  }


  // Payment Cards
  async getAllPaymentCards() {
    try {
      const response = await axios.get(`${this.baseUrl}/paymentCard`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment cards:', error);
      throw error;
    }
  }
  async getAllUserCards(userId) {
        
    try {
      const response = await axios.get(`${this.baseUrl}/paymentCard`);
      console.log(response);
        const userCards= response.data.filter(card => card.userID === userId);
        return(userCards);
      } catch (error) {
        console.error(error);
      }
    }
  
  
  async getPaymentCardById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/paymentCard/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment card by ID:', error);
      throw error;
    }
  }
  async createPaymentCard(paymentCardData) {
    try {
      const response = await axios.post(`${this.baseUrl}/paymentCard`, paymentCardData);
      return response.data;
    } catch (error) {
      console.error('Error creating payment card:', error);
      throw error;
    }
  }

  // Promotions
  async getAllPromotions() {
    try {
      const response = await axios.get(`${this.baseUrl}/promotion`);
      return response.data;
    } catch (error) {
      console.error('Error fetching promotions:', error);
      throw error;
    }
  }

  async getPromotionById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/promotion/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching promotion by ID:', error);
      throw error;
    }
  }
  async createPromotion(promotionData) {
    try {
      const response = await axios.post(`${this.baseUrl}/promotion`, promotionData);
      return response.data;
    } catch (error) {
      console.error('Error creating promotion:', error);
      throw error;
    }
  }
  async checkPromotionCode(code) {
    try {
      const response = await axios.get(`${this.baseUrl}/promotion`);
      const promotion = response.data.find(promotion => promotion.promotionCode === code);
      if (!promotion) {
        return {msg:"Promotion code not found."};
      }else {
      return promotion;
      }
    } catch (error) {
      console.error('Error fetching promotions:', error);
      throw error;
    }

  }

  // Seats
  async getAllSeats() {
    try {
      const response = await axios.get(`${this.baseUrl}/seats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching seats:', error);
      throw error;
    }
  }

  async getSeatById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/seats/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching seat by ID:', error);
      throw error;
    }
  }
  
  async createSeat(seatData) {
    try {
      const response = await axios.post(`${this.baseUrl}/seats`, seatData);
      return response.data;
    } catch (error) {
      console.error('Error creating seat:', error);
      throw error;
    }
  }
  async setSeatsUnavalible(id) {
    try {
      const response = await axios.put(`${this.baseUrl}/seats/${id}`, { isTaken: true });
      return response.data;
    } catch (error) {
      console.error('Error editing seat:', error);
      throw error;
    }
  }
  // ShowTimes
  async getAllShowTimes() {
    try {
      const response = await axios.get(`${this.baseUrl}/showTimes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching show times:', error);
      throw error;
    }
  }

  async getShowTimeById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/showTimes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching show time by ID:', error);
      throw error;
    }
  }
  async createShowTime(showTimeData) {
    try {
      const response = await axios.post(`${this.baseUrl}/showTimes`, showTimeData);
      return response.data;
    } catch (error) {
      console.error('Error creating show time:', error);
      throw error;
    }
  }
  // Statuses
  async getAllStatuses() {
    try {
      const response = await axios.get(`${this.baseUrl}/status`);
      return response.data;
    } catch (error) {
      console.error('Error fetching statuses:', error);
      throw error;
    }
  }

  async getStatusById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/status/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching status by ID:', error);
      throw error;
    }
  }
  async createStatus(statusData) {
    try {
      const response = await axios.post(`${this.baseUrl}/status`, statusData);
      return response.data;
    } catch (error) {
      console.error('Error creating status:', error);
      throw error;
    }
  }
  // Tickets
  async getAllTickets() {
    try {
      const response = await axios.get(`${this.baseUrl}/ticket`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw error;
    }
  }

  async getTicketById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/ticket/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ticket by ID:', error);
      throw error;
    }
  }
  async getTicketByBooking(bookingId) {
    try {
      const response = await axios.get(`${this.baseUrl}/ticket`).data;
      console.log(response);
      const tickets = response.find(ticket => ticket.bookingID === bookingId);
      console.log(tickets);
      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw error;
  }
}
  async createTicket(ticketData) {
    try {
      const response = await axios.post(`${this.baseUrl}/ticket`, ticketData);
      return response.data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  }
  // Ticket Type Prices
  async getAllTicketTypePrices() {
    try {
      const response = await axios.get(`${this.baseUrl}/ticketTypePrices`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ticket type prices:', error);
      throw error;
    }
  }

  async getTicketTypePriceById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/ticketTypePrices/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ticket type price by ID:', error);
      throw error;
    }
  }

  // Users
  async getAllUsers() {
    try {
      const response = await axios.get(`${this.baseUrl}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById(id, token) {
    try {
      const response = await axios.get(`${this.baseUrl}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }
  async updateUser(id, userData) {
    try {
      const response = await axios.put(`${this.baseUrl}/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  
async sendLoginConfirmationEmail(email) {
  try {
      const response = await axios.post('http://smtp.gmail.com:465', {
          email: email
      });
      console.log("Email sent:", response.status);
  } catch (err) {
      console.error("Error sending email:", err);
  }
}

async sendEditConfirmationEmail(requestBody) {
  try {
      const response = await axios.post('http://smtp.gmail.com:465', requestBody);
      console.log("Email sent:", response.status);
  } catch (err) {
      console.error("Error sending email:", err);
  }
}

async tokenIsValid(token) {
  try {
    const response = await axios.post(`${this.baseUrl}/tokenIsValid`, null, {
      headers: {
        'x-auth-token': token
      }
    });
    return response.data;
  } catch (err) {
    console.error("Error checking token validity:", err);
    return false;
  }
}

async  getUserCredentials(token) {
  try {
      const response = await axios.get(`${this.baseUrl}` + token, {
          headers: {
              'x-auth-token': token
          }
      });
      return response.data;
  } catch (err) {
      console.error("Error getting user credentials:", err);
      return null;
  }
}

async signup(email, password, firstName, lastName, phone, address, promotionSubscription) {
  try {
      const response = await axios.post(`${this.baseUrl}/signup,`, {
          email,
          password,
          firstName,
          lastName,
          phone,
          address,
          promotionSubscription
      });
      //await sendLoginConfirmationEmail(email); done in route
      return response.data;
  } catch (err) {
      console.error("Error signing up:", err);
      throw err;
  }
}

async login(email, password) {
  try {
      const response = await axios.post(`${this.baseUrl}/login`, {
          email,
          password
      });
     // await sendLoginConfirmationEmail(email);
      return response.data;
  } catch (err) {
      console.error("Error logging in:", err);
      throw err;
  }
}

async updateProfile(id, email, password, firstName, lastName, phone, address) {
  try {
      const response = await axios.put(`${this.baseUrl}/${id}`, {
          email,
          password,
          firstName,
          lastName,
          phone,
          address
      });
      //await sendEditConfirmationEmail({ email, firstName, lastName, phone, address, password });
      return response.data;
  } catch (err) {
      console.error("Error updating profile:", err);
      throw err;
  }
}

async  sendEmail(user) {
  try {
      const response = await axios.post(`${this.baseUrl}/send`, {
          user
      });
      console.log("Email sent:", response.status);
  } catch (err) {
      console.error("Error sending email:", err);
  }
}

async verifySecurityCode(securityCode, status) {
  try {
      const response = await axios.post(`${this.baseUrl}secuirtyCode`, {
          securityCode,
          status
      });
      return response.data;
  } catch (err) {
      console.error("Error verifying security code:", err);
      throw err;
  }
}
  // User Types
  async getAllUserTypes() {
    try {
      const response = await axios.get(`${this.baseUrl}/userType`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user types:', error);
      throw error;
    }
  }

  async getUserTypeById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/userType/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user type by ID:', error);
      throw error;
    }
  }
  async createUserType(userTypeData) {
    try {
      const response = await axios.post(`${this.baseUrl}/userType`, userTypeData);
      return response.data;
    } catch (error) {
      console.error('Error creating user type:', error);
      throw error;
    }
  }

  // US Ratings
  async getAllUsRatings() {
    try {
      const response = await axios.get(`${this.baseUrl}/usRating`);
      return response.data;
    } catch (error) {
      console.error('Error fetching US ratings:', error);
      throw error;
    }
  }

  async getUsRatingById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/usRating/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching US rating by ID:', error);
      throw error;
    }
  }
  async createUsRating(usRatingData) {
    try {
      const response = await axios.post(`${this.baseUrl}/usRating`, usRatingData);
      return response.data;
    } catch (error) {
      console.error('Error creating US rating:', error);
      throw error;
    }
  }


}

export default DatabaseInterface;
                      