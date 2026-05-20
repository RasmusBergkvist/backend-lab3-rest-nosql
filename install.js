//Hämtar anslutning från db.js
const mongoose = require("./db.js");

//Skapar schema
const WorkexpSchema = new  mongoose.Schema ({
    companyname: {
        type: String,
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
    },
    description: {
        type: String,
        required: true
    }
});

//Inkluderar schema till databas
const Workexp = mongoose.model("Workexp", WorkexpSchema);

module.exports = Workexp;