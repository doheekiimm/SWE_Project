const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    
    email: {
        required: true,
        type: String,
        unique: true,
        trim: true,
    },
    firstName: {
        required: true,
        type: String,
        trim: true,
    },
    lastName: {
        required: true,
        type: String,
        trim: true,
    },
    password: {
        requried: true,
        type: String,
        minLength: 8, 
    },
    phone: {
        required: true,
        type: String, // could also be a type: Number, depends on how we want to handle this
        trim: true,
    },
    address: {
        required: true,
        type: String,
        trim: true,
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'status',
    },
    userType: {
        // not finished yet, have to set up refrence to UserType schema to get userType
        type: Schema.Types.ObjectId,
        ref: 'userType'
    },
    promotionSubscription : {
        // is not required can be null, admins are null.
        type: Boolean, // idk if this is syntax correctly
        default: false
    },
    //code that will allow user to become active
    securityCode: {
        required: true,
        type: String,
        trim: true,  
    }

});

module.exports= User = mongoose.model('user', userSchema);