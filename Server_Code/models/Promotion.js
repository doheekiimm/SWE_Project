const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({

    /*promotionID: { // {PK} primary key
        required: true,
        type: Number, // could aslo be a string
        trim: true,
    },*/
    code: {
        required: true,
        type: String, 
        trim: true, 
        //unique: true, // is this needed, probrably not
    },
    percentage: {
        required: true,
        type: String, 
        trim: true,    
    },
    percentageNumber: {// the number would be 0.5 for %50 off
        required: true,
        type: Number,
        trim: true,
    },
    endDate: {
        required: true,
        type: String, 
        trim: true,  
    },
    isUsed: {// if promo is used dont allow
        type: Boolean, // idk if this is syntax correctly
    }

});

module.exports= Promotion = mongoose.model('promotion', promotionSchema);