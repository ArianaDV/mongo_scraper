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

app.use(logger("dev"));
//set up body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
mongoose.connect("mongodb://localhost/NYData");

//ROUTES
var htmlroutes = require("./routes/htmlRoutes")(app);
var apiroutes = require("./routes/apiRoutes")(app);

app.listen(3000, function() {
  console.log("App running on port 3000!");
});