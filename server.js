require("dotenv").config();

//Hämtar Express och CORS
const express = require("express");
const cors = require("cors");

//Startar applikationen
const app = express();

//Middlewares
app.use(cors());// Tillåter anrop från andra domäner
app.use(express.json()); //Omvandlar JSON-data till JS-objekt

//Hämtar route
const workExpRoute = require("./routes/workexp");

//Kopplar till route
app.use("/workexp", workExpRoute);

app.get("/", (req, res) => {
    res.json({ message: "Api is running" });

});


//Lyssnar och startar applikationen på porten
app.listen(process.env.PORT, () => {
    console.log("Server started on port: " + process.env.PORT);
});