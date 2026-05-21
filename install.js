//Hämtar anslutning från db.js
const mongoose = require("./db.js");

//Skapar schema
const WorkexpSchema = new mongoose.Schema({
    companyname: {
        type: String,
       
        required: [true, "Companyname is missing"]
    },
    jobtitle: {
        type: String,
        required: [true, "Jobtitle is missing"]
    },

    location: {
        type: String,
        required: [true, "Location is missing"]
    },

    startdate: {
        type: Date,
        required: [true, "Startdate is missing"]
    },
    enddate: {
        type: Date,
        required: false
    },
    
    description: {
        type: String,
        required: [true, "Description is missing"]
    }
});

//Inkluderar schema till databas
const Workexp = mongoose.model("Workexp", WorkexpSchema);

module.exports = Workexp;