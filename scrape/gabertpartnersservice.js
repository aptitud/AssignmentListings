/**
 * Created by Zem on 2014-10-10.
 */
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
    scrapegabertpartners: function (req, res) {
        var url = 'http://www.gabert-partners.se/';
        request(url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                var getAsAssignment = function (assignment, location){
                    return { assignment : assignment, location : location};
                }

                var searchResult = [];
                $("ol[class='list']").find("li").filter(function(){
                    var data = $(this);
                    for(var i = 0; i<data.length; i++){
                        var li = $(data[i]);
                        var a = getAsAssignment(li.find('.details').text(),li.find('.meta').text());
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