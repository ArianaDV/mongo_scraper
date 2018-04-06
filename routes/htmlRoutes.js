var db = require("../models");

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

}