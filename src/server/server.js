const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Setup Server

const port = 2001;

const server = app.listen(port, serverr);

function serverr() {
  console.log(`running on localhost: ${port}`);
}

const projectData = {};
app.post("/travel", (req, res) => {
  projectData["fromCity"] = req.body.fromCity;
  projectData["toCity"] = req.body.toCity;
  projectData["date"] = req.body.travel_date;
  projectData["daysLeft"] = req.body.daysLeftTrip;
  projectData["weather"] = req.body.weather;
  console.log(projectData);
  res.send(projectData);
});

module.exports.serverr = serverr;
