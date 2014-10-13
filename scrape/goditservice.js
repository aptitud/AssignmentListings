/**
 * Created by Zem on 2014-10-10.
 */
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
    scrapegodit: function (req, res) {
        var url = 'http://god-it.se/uppdrag/';
        request(url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                var getAsAssignment = function (assignment, link){
                    return { assignment : assignment, link : link};
                }

                var searchResult = [];
                $("#recent-posts-2").find("a").filter(function(){
                    var data = $(this);
                    for(var i = 0; i<data.length; i++){
                        var link = $(data[i]);
                        var a = getAsAssignment(link.text(),link.attr('href'));
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