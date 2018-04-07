var db = require("../models");
var cheerio = require("cheerio");
var request = require("request");

module.exports = function(app) {
// Below code handles when users "visit" a page.

    //Get all scraped data from DB
    app.get("/", function(req,res){
        db.Article.find({})
          .then(function(dbArticle){
            res.render("index", {article: dbArticle});
          })
          .catch(function(err){
            res.json(err);
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
    result.summary = $(this)
    .nextAll(".summary");
    // .hasClass("summary")
    console.log(result.summary);
    
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
  
//Save form submission - Incomplete!!!
app.post("/submit", function(req, res){
    console.log(req.body);
  
    db.Note.insert(req.body, function(error, saved){
      if(error){
        console.log(error);
      }
      else {
        res.send(saved);
      }
    });
  });  

}