/**
 * Created by Zem on 2014-10-10.
 */
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
    scrapeEworks: function (req, res) {
        var url = 'https://www.ework.se/Soker-du-uppdrag/Alla-uppdrag/(filtertext)/all/(filtercompetence)/-1/(filtercountry)/1350';
        request(url, function(error, response, html){

            if(!error){
                var $ = cheerio.load(html);
                var getAsAssignment = function (assignment, kompetens, date){
                    return { assignment : assignment, kompetens : kompetens, date : date};
                }

                var searchResult = [];
                $(".content_table").find("tr[class*='listContent']").filter(function(){
                    var data = $(this);

                        var cells = data.find('td');
                        if(cells.length > 2 && useFilter(cells.text())){
                            var a = getAsAssignment($(cells[0]).text(),$(cells[1]).text(),$(cells[2]).text());
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

function useFilter(text){
    var filterStad = ['Stockholm', 'Södertälje'];
    var filters = ['java', '.NET', 'Testledare', 'Testledning'];
    var result = false;
    filters.forEach(function(filter){

        if(text.toLowerCase().indexOf(filter.toLowerCase()) != -1){
            console.log(filter);
            result = true;
        }
    });
    var stadresult= false;
    filterStad.forEach(function(filter){

        if(text.toLowerCase().indexOf(filter.toLowerCase()) != -1){
            console.log(filter);
            stadresult = true;
        }
    });
    return result && stadresult;
}