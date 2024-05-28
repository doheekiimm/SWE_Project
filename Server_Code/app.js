const express = require('express');
const app =express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const cors = require('cors');

// connect database
app.use(cors({origin: true, credentials:true}));
app.use(express.json({extend: false}));
app.get('/', (req, res) => res.send('Server Connected'));
// const conn_str =   "mongodb+srv://ldbobo531:pQ.uQaut2-qC73r@cluster0.hbdbygq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// 원래 db에 있던 데이터 새 db로 이동. 
// mongodump --uri="mongodb+srv://ldbobo531:pQ.uQaut2-qC73r@cluster0.hbdbygq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" --out=/Users/kimdohee/Desktop/mongoDB_BackUp

// mongorestore --uri="mongodb+srv://gitfordh15:dh1234@movie.rkozdlt.mongodb.net/?retryWrites=true&w=majority&appName=movie" /Users/kimdohee/Desktop/mongoDB_BackUp

const conn_str =   "mongodb+srv://gitfordh15:dh1234@movie.rkozdlt.mongodb.net/?retryWrites=true&w=majority&appName=movie";
mongoose.set('strictQuery', false);
mongoose.connect(conn_str)
.then(()=> {
    app.listen(port)
    console.log(`MongoDB Connection Suceeded...`)
})
.catch(err => {
    console.log(`Error in DB Connection ${err}`);
});

// using Routes

const users = require('./routes/api/users');
const movies = require('./routes/api/movies');
const auditorium = require('./routes/api/auditorium');
const booking = require('./routes/api/booking');
const movieShow = require('./routes/api/movieShow');
const paymentCard = require('./routes/api/paymentCard');
const promotion = require('./routes/api/promotion');
const seats = require('./routes/api/seats');
const showTimes = require('./routes/api/showTimes');
const status = require('./routes/api/status');
const ticket = require('./routes/api/ticket');
const ticketTypePrices = require('./routes/api/ticketTypePrices');
const userType = require('./routes/api/userType');
const usRating = require('./routes/api/usRating');
const card = require('./routes/api/paymentCard');

app.use('/api/users',users);
app.use('/api/movies', movies);
app.use('/api/auditorium', auditorium);
app.use('/api/booking', booking);
app.use('/api/movieShow', movieShow);
app.use('/api/paymentCard', paymentCard);
app.use('/api/promotion', promotion);
app.use('/api/seats', seats);
app.use('/api/showTimes', showTimes);
app.use('/api/status', status);
app.use('/api/ticket', ticket);
app.use('/api/ticketTypePrices',ticketTypePrices);
app.use('/api/userType', userType);
app.use('/api/usRating', usRating);
app.use('/api/paymentCard', card);
/*
//create status docs (done once)
const userTypeDocs = [
    { statusType: 'user' },
    { statusType: 'admin' },
    { statusType: 'employee' }
];

// Insert status documents into the database
UserType.insertMany(userTypeDocs)
    .then(() => {
        console.log('UserType documents inserted successfully');
    })
    .catch(err => {
        console.error('Error inserting UserType documents:', err);
    });

/*
//create status docs (done once)
const statusDocs = [
    { statusType: 'active' },
    { statusType: 'inactive' },
    { statusType: 'suspended' }
];

// Insert status documents into the database
Status.insertMany(statusDocs)
    .then(() => {
        console.log('Status documents inserted successfully');
    })
    .catch(err => {
        console.error('Error inserting status documents:', err);
    });
*/ 

/*const nodemailer = require("nodemailer");
// Import NodeMailer (after npm install)

async function main() {
// Async function enables allows handling of promises with await

  // First, define send settings by creating a new transporter: 
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: "groupa6cinema@gmail.com", // Your email address
      pass: "bbbn dzvz lcus pthe", // Password (for gmail, your app password)
      
    },
  });
  
  // Define and send message inside transporter.sendEmail() and await info about send from promise:
  let info = await transporter.sendMail({
    from: '"Group 6A" <groupa6cinema@gmail.com>',
    to: "bjoshua606@gmail.com", //replace with user.email later
    subject: "Testing, testing, 123",
    html: `
    <h1>Hello there</h1>
    <p>Isn't NodeMailer useful?</p>
    `,
  });

  console.log(info.messageId); // Random ID generated after successful send (optional)
}

main()
.catch(err => console.log(err));
*/
