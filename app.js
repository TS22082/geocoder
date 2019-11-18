const inquirer = require("inquirer");
var NodeGeocoder = require("node-geocoder");
require("dotenv").config();

var options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: process.env.API_KEY,
  formatter: null
};

var geocoder = NodeGeocoder(options);

searchLocation = () => {
  inquirer
    .prompt({
      type: "input",
      message: "which place would you like to geocode?",
      name: "usersearch"
    })
    .then(inquirerResponse => {
      geocoder.geocode(inquirerResponse.usersearch, function(err, res) {
        console.log(res);
        startApp();
      });
    });
};

startApp = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      choices: ["search", "quit"],
      name: "start"
    })
    .then(inquirerResponse => {
      if (inquirerResponse.start === "quit") {
        console.log("goodbye");
        process.exit();
      } else {
        searchLocation();
      }
    });
};

startApp();
