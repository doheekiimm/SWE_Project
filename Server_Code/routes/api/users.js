const express = require("express");
const bcryptjs = require("bcryptjs");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require('../../models/User');
const bodyParser = require("body-parser");
const Status = require('../../models/Status');
const UserType = require('../../models/UserType');
const { ObjectId } = require('mongodb');
const { Console } = require("console");
const nodemailer = require("nodemailer");// Import NodeMailer (after npm install)

async function sendLoginConfirmationEmail(email) {
    try {
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
            to: email,
            subject: "Login Confirmation for Group A6 Cinema E-Booking System",
            html: `
                <h1>Hello there</h1>
                <p>This is your confirmation Email That you logged in! Soon these will have personalized messages!!</p>
            `,
        });
        console.log("Email sent:", info.messageId);
    } catch (err) {
        console.error("Error sending email:", err);
    }
}
// email to send code
async function sendCode(reqBody) {
    const email = reqBody.email;
    const securCode =reqBody.securityCode;
    console.log(securCode);
    try {
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
            to: email,
            subject: "Verification Code for Group A6 Cinema E-Booking System",
            html: `
                <h1>Hello, please enter the Code into the form.</h1>
                <p>You have logged in! This is your Verification code, ${securCode}.Entering the code into the system will activate your account!</p>
            `,
        });
        console.log("Email sent:", info.messageId);
    } catch (err) {
        console.error("Error sending email:", err);
    }
}
/////////////////////
async function sendEditConfirmationEmail(requestBody) {
    try {
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
            to: email,
            subject: "Edit Confirmation for Group A6 Cinema E-Booking System",
            html: `
                <h1>Hello there</h1>
                <p>You have updated your user Profile! Here arethe details:</p>
                <p>First Name: ${requestBody.firstName}</p>
                <p>Last Name: ${requestBody.lastName}</p>
                <p>Phone: ${requestBody.phone}</p>
                <p>Address: ${requestBody.address}</p>
                <p>Password: ${requestBody.password}</p>
                <p> If you did not make these changes, please contact us immediately!</p>
            `,
        });
        console.log("Email sent:", info.messageId);
    } catch (err) {
        console.error("Error sending email:", err);
    }
}
// Signup Route
userRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone, address, promotionSubscription, securityCode } = req.body;
        
        // Check if all required fields are provided
        if (!email || !password || !firstName || !lastName || !phone || !address ||  promotionSubscription === undefined) {
            return res.status(400).json({ msg: "Please enter all the required fields" });
        }

        // Check if password meets the minimum length requirement
        if (password.length < 8) {
            return res.status(400).json({ msg: "Password must have at least 8 characters" });
        }

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "This email address is already in use" });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 8);
        
        let status = await Status.findOne({ statusType: 'inactive' });
        if (!status) {
            return res.status(500).json({ msg: "Active status document not found" });
        }
        
        let userType = await UserType.findOne({ userType: 'user' });
        if (!userType) {
            return res.status(500).json({ msg: " User userType document not found" });
        }

        // Create a new User instance with all provided fields
        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            address,
            status: status._id, // Assuming statusType is provided and represents the status
            userType: userType._id, // Assuming userType is provided and represents the user type
            promotionSubscription,
            securityCode
        });
      
        // Save the new user
        const savedUser = await newUser.save();

        console.log("User created:", savedUser);

        // Send confirmation email
        //sendLoginConfirmationEmail(newUser.email);
        sendCode(newUser);
        //
        res.json(savedUser);
        // Signup Route


const token = 'your-jwt-token';
const secretKey = 'your-secret-key';

jwt.verify(token, secretKey, (err, decodedPayload) => {
  if (err) {
    console.log('Token verification failed:', err);
  } else {
    console.log('Decoded payload:', decodedPayload);
  }

 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: err.message });
        console.log(res.body);
    }
});
// Login Route
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ msg: "Please provide both email and password" });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found, send error response
        const isMatch = bcryptjs.compare(password, user.password);

        // If passwords match, generate JWT token
        const token = jwt.sign({ id: user._id }, "your-secret-key", { expiresIn: "1h" }); // Example: Token expires in 1 hour
        sendLoginConfirmationEmail(user.email);
        // Send token and user data in response
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName, 
                lastName: user.lastName,
                password: user.password,
                address: user.address,  
                phone: user.phone,
                status: user.status,
                userType: user.userType,
                promotionSubscription: user.promotionSubscription,
                securityCode: user.securityCode
                
                
            }
        });
        ////////////////////////////////////////////////////Send email//////////////////////////////////////////////////////////////////////


    } catch (err) {
        console.log(res.body);
        console.error("Error logging in:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// To Check If Token is Valid
userRouter.post("/tokenIsValid", async (req, res) => {
    try{
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);
        const verified = jwt.verify(token, "passwordKey");
        if(!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if(!user) return res.json(false);
        return res.json(true);
    } catch (err) {
        console.log("Why")
        res.status(500).json({error: err.message});
    }
});

// to get user credentials
userRouter.get("/:id", auth, async(req, res)=> {
    const user = await User.findById (req.user);
    res.json({
        user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        address: user.address,
        phone: user.phone,
        promotionSubscription: user.promotionSubscription,
        userType: user.userType,
        status: user.status,
        securityCode: user.securityCode
        }
    });
});

//edit user routines
userRouter.put("/:id", async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone, address, status, promotionSubscription, securityCode} = req.body;
        const hashedPassword = await bcryptjs.hash(req.body.password, 8);
        await User.findByIdAndUpdate(req.params.id, { ...req.body, password: hashedPassword });
        sendEditConfirmationEmail(req.body.email);
        res.json({ msg: 'Updated user successfully.' , 
        user: {
        id: req.params.id,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        status: req.body.status,
        promotionSubscription: req.body.promotionSubscription,
        securityCode: req.body.securityCode
        }
        //cardNumber: ,
        //cardNumber: paymentCard.cardNumber, // should this get the user id or is that done on the front end
        } );
    } catch (err) {
        res.status(400).json({ error: 'Unable to update the database.' });
    }
});
userRouter.put("/updateStatus/:id", async (req, res) => {
    try {
        const { statusId } = req.body;
        await User.findByIdAndUpdate(req.params.id, { status: statusId });
        res.json({ msg: 'Updated user status successfully.' ,
        user: {
        id: req.params.id,
        status: statusId
        }
        });
    } catch (err) {
        res.status(400).json({ error: 'Unable to update the database.' });
    }
}
);

/*
    updateStatusRoute.put('/updateStatus',async (req, res) => {
        try{
            //const {status} =req.body;
            await User.findByIdAndUpdate(req.params.id, { status });
            res.json({msg: 'Updated user successfully.' , 
            user: {
            id: req.params.id,
            status: status
        }})
        } catch (err) {
            res.status(400).json({ error: 'Unable to update the database.' });
        }

    })*/

// send email
userRouter.post('/send', async (req, res) => { 
  const user = await User.findById (req.user);
try{
const mailContent ={
  from: '"Group 6A" <groupa6cinema@gmail.com>',
    to: user.email, //replace with user.email later
    subject: "This is a test email",
    html: `
    <h1>Hello there</h1>
    <p>Isn't NodeMailer useful?</p>
    `,
};
await transporter.sendMail(mailContent);
res.status(200).send('Email sent successfully!');
console.log(user.email);
}catch{
    console.log(user.email);
  console.error('Error sending email:', error);
  res.status(500).send('Error sending email.');
}

});



/* compare security code and if correct updates users status to active/*
/* Corrected route path and included :id parameter
userRouter.put("/securityCode/:id", async(req, res) => {
    try {
        const { securityCode, status } = req.body;
        if (!securityCode) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }
        const user = await User.findOne({ securityCode }); // searches the database for security code
        if (!user) {
            return res.status(400).send({ msg: "Invalid security code" });
        }
        if (securityCode !== user.securityCode) {
            return res.status(400).send({ msg: "Incorrect security code" });
        }

        // Ensure the status is set to 'active'
        const updatedStatus = status === 'active' ? status : 'inactive';

        const updateUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { status: updatedStatus } },
            { new: true } // Return the updated document
        );
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updateUser); // Simplified response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
*/


module.exports =userRouter;