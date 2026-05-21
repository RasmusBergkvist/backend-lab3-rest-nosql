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

        //Om databasen är tom.
        if (result.length === 0) {
            res.status(404).json({ message: "Database is empty." });
            return;
        }

        return res.json(result);

    } catch (error) {

         console.error(error)
        return res.status(500).json({ message: "Internal server error. Failed to get data." });
    }
});

//Hämta ett objekt från databasen
app.get("/workexp/:id", async (req, res) => {

    try {
        let result = await Workexp.findOne({ _id: req.params.id });

        //Om ingen post hittas.
        if (!result) {
            res.status(404).json({ message: "No post found." });
            return;
        }

        return res.json(result);

    } catch (error) {

        return res.status(500).json({message: "Internal server error. Could not get data."});
    }
});



//Lägger till i databasen
app.post("/workexp", async (req, res) => {
    try {
        //Kontrollera att om datan redan finns. 
        let existingExp = await Workexp.findOne({
            companyname: req.body.companyname,
            jobtitle: req.body.jobtitle,
            startdate: req.body.startdate
        });

        if (existingExp) {
            return res.status(409).json({ message: "Post already exist." })
        }


        let result = await Workexp.create(req.body);

        return res.json(result);

    } catch (error) {
        //Kontroll att obligatoriska uppgifter är ifyllda.
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed. Fill in reqruied fields", errors: error.errors
            });
        }

        console.error(error)
        return res.status(500).json({ message: "Internal server error. Failed to post data." })


    }
});

//Ändra objekt i databasen
app.put("/workexp/:id", async (req, res) => {
    try {

        //runValidators: true aktiverar valideringen innan dokumentet uppdateras med ny data
        let result = await Workexp.updateOne({ _id: req.params.id }, { $set: req.body }, { runValidators: true });


        //Om inget resultat hittas
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "No post found" });
        }

        res.json(result);


    } catch (error) {
        //Felmeddelande om inte obligatoriska uppgifter är ifyllda
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed. Fill in reqruied fields", errors: error.errors
            });
        }

        //Vid övriga fel skickas status 500 som felmeddelande.
        console.error(error)
        return res.status(500).json({ message: "Internal server error. Failed to update data." });
    }

});



//Radera objekt i databasen
app.delete("/workexp/:id", async (req, res) => {
    try {
        let result = await Workexp.deleteOne({ _id: req.params.id });

        //Om inget resultat hittas
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No post found." });
        }

        return res.json(result);

    } catch (error) {

        console.error(error)
        return res.status(500).json({ message: "Internal server error. Failed to delete data." });
    }
    

});



//Lyssnar och startar applikationen på porten
app.listen(process.env.PORT, () => {
    console.log("Servern startade på port: " + process.env.PORT);
});