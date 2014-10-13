/**
 * Created by Zem on 2014-10-13.
 */
app.service('ScrapeService', function($http){

    this.scrape = function(type){
        return  $http.get('/scrape',{
            params: {
                type: type
            }
        });
    }
});