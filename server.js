// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var logger = require("morgan");

//Parses HTML and helps find elements
var cheerio = require("cheerio");

var request = require("request");
//Require all models
var db = require("./models");

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/TimesData";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  // useMongoClient: true
});

app.use(logger("dev"));
//set up body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//ROUTES
var htmlroutes = require("./routes/htmlRoutes")(app);
var apiroutes = require("./routes/apiRoutes")(app);

app.listen(PORT, function() {
  console.log("App running on port 3000!");
});