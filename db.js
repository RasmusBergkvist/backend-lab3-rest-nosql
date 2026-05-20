//Hämtar Mongoose
const mongoose = require("mongoose");

//Läser in inställningar från env-fil
require("dotenv").config();

//Kopplar upp mot Mongo DB
mongoose.connect(process.env.MONGODB_URI).then (() =>  {
    console.log("Connected to MongoDB")

}).catch((error) => {
    console.log("Error connected to database: ", error)
});

module.exports = mongoose;