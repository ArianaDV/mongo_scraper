//Parses HTML and helps find elements
var cheerio = require("cheerio");

var request = require("request");

console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from reddit's webdev board:" +
            "\n***********************************\n");
//Making a request for Time's page
request("https://www.nytimes.com/section/technology", function(error, response, html){

  var $ = cheerio.load(html);
//Array to save scraped data
  var results = [];

$("h2.headline").each(function(i, element){
  var title = $(element).text();
  var link = $(element).children().attr("href");

  results.push({
    title: title,
    link: link
  });
});
  console.log(results);
});