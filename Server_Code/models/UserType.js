//https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose
const mongoose = require("mongoose");

const userTypeSchema = new mongoose.Schema({
    //Enumeration
    userType: {
         type: String,
         enum : ['user','admin','employee'],
     },
 })

 module.exports= UserType = mongoose.model('userType', userTypeSchema);