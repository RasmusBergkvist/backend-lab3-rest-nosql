const Workexp = require("./install.js");

require("dotenv").config();

//Hämtar Express och CORS
const express = require("express");
const cors = require("cors");

//Startar applikationen
const app = express();

//Middlewares
app.use(cors());// Tillåter anrop från andra domäner
app.use(express.json()); //Omvandlar JSON-data till JS-objekt

app.get("/", (req, res) => {
    res.json({message: "Api is running"});

});

//Hämtar från databasen
app.get("/workexp", async (req, res) => {
    try{
        let result = await Workexp.find();

        return res.json(result);

    } catch(error) {
        
        return res.status(500).json(error);
    }
});

//Lägger till i databasen
app.post("/workexp", async (req, res) => {
    try {
        let result = await Workexp.create(req.body);

        return res.json(result);

    } catch(error) {
        
        return res.status(400).json(error);
    }
});

//Lyssnar och startar applikationen på porten
app.listen(process.env.PORT, () => {
    console.log("Servern startade på port: " + process.env.PORT);
});