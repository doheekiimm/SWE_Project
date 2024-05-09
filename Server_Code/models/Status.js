//https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose
const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
    //Enumeration
    statusType: {
         type: String,
         enum : ['active','inactive','suspended'],
     },
 })

 module.exports= Status = mongoose.model('status', statusSchema);
 //add one super admin, admin can add other admins in admin pages 