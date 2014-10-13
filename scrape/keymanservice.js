/**
 * Created by Zem on 2014-10-10.
 */
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
    scrapekeyman: function (req, res) {
        var url = 'http://www.keyman.se/jag-ar-konsult/uppdrag/';
        request(url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                var getAsAssignment = function (assignment, link){
                    return { assignment : assignment, link : link};
                }

                var searchResult = [];
                $("article[id*='assignment']").filter(function(){
                    var data = $(this);
                    for(var i = 0; i<data.length; i++){
                        var article = $(data[i]);
                        var link = url + article.find("h1").find('a').attr('href');
                        var a = getAsAssignment(article.find("h1").text(),link);
                        searchResult.push(a);
                    }
                });

                res.json({
                    assignments : searchResult
                });
            }else{
                res.send(error);
            }
        });
    }
};