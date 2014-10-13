/**
 * Created by Zem on 2014-10-10.
 */
var app = angular.module('MainApp',[]);

app.factory('Loader', function(){
    var loader = {};
    loader.start = function(){
        $("#loader").addClass('overlay');
    }
    loader.end = function(){
        $("#loader").removeClass('overlay');
    }
    return loader;
});