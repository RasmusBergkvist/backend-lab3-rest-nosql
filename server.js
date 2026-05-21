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
    res.json({ message: "Api is running" });

});

//Hämtar alla objekt från databasen
app.get("/workexp", async (req, res) => {

    try {
        let result = await Workexp.find();

        if (result.length === 0) {
            res.status(404).json({ message: "Database is empty." });
        }

        return res.json(result);

    } catch (error) {

        return res.status(500).json(error);
    }
});

//Hämta ett objekt från databasen
app.get("/workexp/:id", async (req, res) => {

    try {
        let result = await Workexp.findOne({_id: req.params.id});

        if (!result) {
            res.status(404).json({ message: "Database is empty." });
        }

        return res.json(result);

    } catch (error) {

        return res.status(500).json(error);
    }
});



//Lägger till i databasen
app.post("/workexp", async (req, res) => {
    try {
        let result = await Workexp.create(req.body);

        return res.json(result);

    } catch (error) {

        return res.status(400).json(error);
    }
});

//Ändra objekt i databasen
app.put("/workexp/:id", async (req, res) => {
    try {

        let result = await Workexp.updateOne({ _id: req.params.id }, {$set: req.body} );


        //Om inget resultat hittas
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "No post found" });
        }

         res.json(result);
    

    } catch (error) {

        //Vid fel skickas status 500 som felmeddelande.
        console.error(error)
        return res.status(500).json({ message: "Failed to update data" });
    }

});



//Radera objekt i databasen
app.delete("/workexp/:id", async (req, res) => {
    try {
        let result = await Workexp.deleteOne({ _id: req.params.id });

        return res.json(result);

    } catch (error) {

        return res.status(400).json(error);
    }
});



//Lyssnar och startar applikationen på porten
app.listen(process.env.PORT, () => {
    console.log("Servern startade på port: " + process.env.PORT);
});