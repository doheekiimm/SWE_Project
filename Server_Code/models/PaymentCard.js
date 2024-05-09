const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new mongoose.Schema({
    /*cardID: { // {PK} primary key
        required: true,
        type: Number,
        trim: true,

    },
    */ //removed in favor of using objectid
    userID: { // {FK} Foreign key
        //not finished yet, have to set up refrence to User schema to get ID //Im doing it on the front end through useContext so no need
        type: Schema.Types.ObjectId,
        ref: 'User',
        //unique : true, not sure if needed yet, user can have many cards
    },
    cardNumber: {
        // needs to be encripted
        required: true,
        type: String ,
        trim: true,
    },
    name: {
        required: true,
        type: String,
        trim: true,
    },
    address: { // may need to be changed, look at object relationship mapping pdf number 3
       //required: true,
        type: String,
        trim: true,
        default: "",
    },
    expirationDate: {
        required: true,
        type: String,
        trim: true,
    },
    /*
    cvv: {
        required: true,
        type: Number,
        trim: true,
        minLength: 3,
        maxLength: 3
    
    }*/
});

module.exports= PaymentCard = mongoose.model('paymentCard', paymentSchema);