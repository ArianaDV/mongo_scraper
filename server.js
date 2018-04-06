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
// require("./routes/htmlRoutes")(app);

app.get("/articles", function(req, res){
  res.render("index", req.body);
});

//Save form submission!!
app.post("/submit", function(req, res){
  console.log(req.body);

  db.notes.insert(req.body, function(error, saved){
    if(error){
      console.log(error);
    }
    else {
      res.send(saved);
    }
  });
});

//Making a request for NYTime's page
// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req,res){
  request("https://www.nytimes.com/section/technology", function(error, response, html){

  var $ = cheerio.load(html);

$("h2.headline").each(function(i, element){
  //Object where results will be saved  
  var result = {};
  result.title = $(this)
    .children("a")
    .text();
  result.link = $(this)
    .children("a")
    .attr("href");

  db.Article.create(result)
    .then(function(dbArticle){
      console.log(dbArticle);
    })
    .catch(function(err){
      return res.json(err);
    });
  });
  res.send("Scrape Complete");
  });
});

app.listen(3000, function() {
  console.log("App running on port 3000!");
});