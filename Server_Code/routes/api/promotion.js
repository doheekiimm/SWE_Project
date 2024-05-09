const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")
const User = require('../../models/User');
const Promotion = require('../../models/Promotion')
const nodemailer = require("nodemailer");// Import NodeMailer (after npm install)


router.get('/', (req, res) => {
    Promotion.find()
        .then((promotions) => res.json(promotions))
        .catch((err) => res.status(404).json({nopromotionsfound: 'No promotions found.'}))

})

router.get('/:id', (req, res) => {
    Promotion.findById(req.params.id).
    then((promotion) => res.json(promotion))
    .catch((err) => res.status(404).json({noitemsfound: "No promotion found."}))
})

router.post('/', bodyParser.json(), (req, res) => {
    Promotion.create(req.body)
    sendpromotion(req.body)
        .then((promotion) => res.json({msg: 'Promotion added successfully.'}))
        .catch((err) => res.status(400).json({ error: 'Unable to add this promotion'}))
})
// send email to all users
async function sendpromotion(reqBody) {
    try {
        const userEmail = await User.find({promotionSubscription: true}, { email: 1 });// an array of all emails in user data table
        console.log(userEmail);
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
            to: userEmail, // an array of all emails in user data table
            subject: "New Promotion for our Cenima ebooking system",
            html: `
                <h1>New Promotion</h1>
                <p>This is your new promotion code: ${reqBody.code} for ${reqBody.percentage}percentage off. Expires on  ${reqBody.endDate}.</p>
            `,
        });
        console.log("Email sent:", info.messageId);
    } catch (err) {
        console.error("Error sending email:", err);
    }
}

router.put('/:id', bodyParser.json(), (req, res) => {
    Promotion.findByIdAndUpdate(req.params.id, req.body)
        .then((promotion) => res.json({msg: 'Updated successfully.'}))
        .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))
})

router.delete('/:id', (req, res) => {
    Promotion.findByIdAndDelete(req.params.id)
        .then((promotion) => res.json({msg: 'Promotion entry successfully deleted'}))
        .catch((err) => res.status(404).json({error: 'No such promotion'}))
})

module.exports = router; 