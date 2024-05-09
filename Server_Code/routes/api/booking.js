const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer");// Import NodeMailer (after npm install)
const Movie = require('../../models/Movie')
const Booking = require('../../models/Booking')

router.get('/', (req, res) => {
    Booking.find().
    then((booking) => res.json(booking))
    .catch((err) => res.status(404).json({noitemsfound: "No bookings found."}))

})

router.get('/:id', (req, res) => {
    Booking.findById(req.params.id).
    then((booking) => res.json(booking))
    .catch((err) => res.status(404).json({noitemsfound: "No booking found."}))
})

router.post('/', bodyParser.json(), async (req, res) => {
    try {
        // Check required fields
        const requiredFields = ['userId', 'movieShowID', 'showTimeID', 'cardID', 'numberOfTickets', 'totalPrice'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `Missing required field: ${field}` });
            }
        }

        // Validate numeric fields
        const numericFields = ['numberOfTickets', 'totalPrice'];
        for (const field of numericFields) {
            if (isNaN(req.body[field]) || req.body[field] <= 0) {
                return res.status(400).json({ error: `Invalid value for ${field}: ${req.body[field]}` });
            }
        }

        // Check promoID if provided
        if (req.body.promoID && !isValidObjectId(req.body.promoID)) {
            return res.status(400).json({ error: `Invalid promoID: ${req.body.promoID}` });
        }

        // Create booking object
        const booking = {
            userId: req.body.userId,
            movieShowID: req.body.movieShowID,
            showTimeID: req.body.showTimeID,
            cardID: req.body.cardID,
            numberOfTickets: req.body.numberOfTickets,
            totalPrice: req.body.totalPrice,
            promoID: req.body.promoID
        };
        sendBookingConfirmation(booking)
        console.log("New booking data:", booking); // Log the booking data

        // Create booking using Mongoose's Booking model
        Booking.create(booking)
            .then((createdBooking) => {
                console.log("Booking created:", createdBooking); // Log the created booking
                res.json({ id: createdBooking._id, msg: 'Booking added successfully.' });
            })
            .catch((err) => {
                console.error('Error creating booking:', err);
                res.status(500).json({ error: 'Unable to add this booking' });
            });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// Function to validate ObjectId format
function isValidObjectId(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
}

router.put('/:id', bodyParser.json(), (req, res) => {
    Booking.findByIdAndUpdate(req.params.id, req.body)
        .then((booking) => res.json({msg: 'Updated successfully.'}))
        .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))
})

router.delete('/:id', (req, res) => {
    Booking.findByIdAndDelete(req.params.id)
        .then((booking) => res.json({msg: 'Booking entry successfully deleted'}))
        .catch((err) => res.status(404).json({error: 'No such booking'}))
})

async function sendBookingConfirmation(booking) {
    try {
        const user = await User.findById(booking.userId);// this is the reqBody, if you have a issue its stems form here 
        const userEmail = user.email;
        //console.log(userEmail);
        // getting movie show
        const movieShow = await MovieShow.findById(booking.movieShowID);// this is the reqBody, if you have a issue its stems form here 
        //console.log(movieShow);
        // getting movie title
        const movie = await Movie.findById(movieShow.movieID)
        //console.log(movie);
        const movieShowMovie = movie.movie_title;
        // gettig movie timestamp
        const time = await ShowTime.findById(booking.showTimeID);// this is the reqBody, if you have a issue its stems form here 
        const movieTime = time.timeStamp;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
            port: 465, // Port for SMTP (usually 465)
            secure: true, // Usually true if connecting to port 465
            auth: {
                user: "groupa6cinema@gmail.com", // Your email address
                pass: "bbbn dzvz lcus pthe", // Password (for gmail, your app password)
            },
        });
        let info = await transporter.sendMail({
            from: '"Group 6A" <groupa6cinema@gmail.com>',
            to: userEmail, 
            subject: "Booking Confirmation Email",
            html: `
                <h1>Booking</h1>
                <p>This is your confirmation email for: ${movieShowMovie}.</p> 
                <p>Time: ${movieTime}. </p>
                <p>Total number of tickets:  ${booking.numberOfTickets}.</p>
                <p>Total Price: ${booking.totalPrice}</p>
                <p>Promotion used: ${booking.promoID.code}</p>
            `,
        });
        console.log("Email sent:", info.messageId);
    } catch (err) {
        console.error("Error sending email:", err);
    }
}

module.exports = router; 