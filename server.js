// Dependencies
var express = require("express");
var mongojs = require("mongojs");

//Parses HTML and helps find elements
var cheerio = require("cheerio");

var request = require("request");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "nyscraper";
var collections = ["nyscrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

//Main route
app.get("/", function(req, res){
  res.send("Hello World");
});

app.get("/all", function(req,res){
  db.nyscrapedData.find({}, function (error, found){
    if (error){
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

//Making a request for NYTime's page
// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req,res){
  request("https://www.nytimes.com/section/technology", function(error, response, html){

  var $ = cheerio.load(html);

$("h2.headline").each(function(i, element){
  var title = $(element).text();
  var link = $(element).children().attr("href");

  if(title && link){
    db.nyscrapedData.insert({
      title: title,
      link: link
    },
    function(err, inserted){
      if (err){
        console.log(err);
      }
      else {
        console.log(inserted);
      }
    });
  }
});
});

res.send("Scrape Complete");
});

app.listen(3000, function() {
  console.log("App running on port 3000!");
});