/**
 * Created by Zem on 2014-10-10.
 */
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
    scrapeRapidkonsult: function (req, res) {
        var url = 'http://www.rapidkonsult.se/uppdrag/careers/index.php?m=careers&p=showAll';
        request(url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                var getAsAssignment = function (assignment, location){
                    return { assignment : assignment, location : location};
                }

                var searchResult = [];
                $(".sortable").find("tr[class!='rowHeading']").filter(function(){
                    var data = $(this);

                    for(var i = 0; i<data.length; i++){
                        var cells = $(data[i]).find('td');
                        if(cells.length > 1){
                            var a = getAsAssignment($(cells[0]).text(),$(cells[1]).text());
                            searchResult.push(a);
                        }
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