//Hämtar express och databasanslutning
const express = require("express");
const db = require("../db");

const Workexp = require("../install.js");

//Skapar router till endpoints
const router = express.Router();


//Hämtar alla objekt från databasen
router.get("/", async (req, res) => {

    try {
        //Hämtade sorteras efter senaste startdatum.
        let result = await Workexp.find().sort({startdate: -1});

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
router.get("/:id", async (req, res) => {

    try {
        let result = await Workexp.findOne({ _id: req.params.id });

        //Om ingen post hittas.
        if (!result) {
            res.status(404).json({ message: "No post found." });
            return;
        }

        return res.json(result);

    } catch (error) {
        //O, felaktigt id anges
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID." });
        }


        return res.status(500).json({ message: "Internal server error. Could not get data." });
    }
});



//Lägger till i databasen
router.post("/", async (req, res) => {
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

        return res.status(201).json(result);

    } catch (error) {
        //Kontroll att obligatoriska uppgifter är ifyllda.
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed. Fill in required fields", errors: error.errors
            });
        }

        console.error(error)
        return res.status(500).json({ message: "Internal server error. Failed to post data." })


    }
});

//Ändra objekt i databasen
router.put("/:id", async (req, res) => {
    try {

        //runValidators: true aktiverar valideringen innan dokumentet uppdateras med ny data
        let result = await Workexp.updateOne({ _id: req.params.id }, { $set: req.body }, { runValidators: true });


        //Om inget resultat hittas
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "No post found" });
        }

        return res.json(result);


    } catch (error) {
        //Felmeddelande om inte obligatoriska uppgifter är ifyllda
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed. Fill in reqruied fields", errors: error.errors
            });
        }
        //Vid om felaktigt id anges
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID." });
        }


        //Vid övriga fel skickas status 500 som felmeddelande.
        console.error(error)
        return res.status(500).json({ message: "Internal server error. Failed to update data." });
    }

});



//Radera objekt i databasen
router.delete("/:id", async (req, res) => {
    try {
        let result = await Workexp.deleteOne({ _id: req.params.id });

        //Om inget resultat hittas
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No post found." });
        }

        return res.json(result);

    } catch (error) {

        //Vid om felaktigt id anges
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID." });
        }


        console.error(error)
        return res.status(500).json({ message: "Internal server error. Failed to delete data." });
    }

});

//Exportera route
module.exports = router;
