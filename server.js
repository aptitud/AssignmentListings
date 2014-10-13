/**
 * Created by Zem on 2014-10-10.
 */
// set up ========================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var morgan = require('morgan'); 			// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var eworksService = require('./scrape/eworksservice');
var rapidkonsultService = require('./scrape/rapidkonsultservice');
var goditService = require('./scrape/goditservice');
var gabertpartnersService = require('./scrape/gabertpartnersservice');
var keymanService = require('./scrape/keymanservice');

// configuration =================

mongoose.connect('mongodb://fmf:fmfadmin@linus.mongohq.com:10000/findmyfriend'); 	// connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

app.get('/scrape', function(req, res){
    var type = req.param('type');
    if(type == 'ework') {
        eworksService.scrapeEworks(req, res);
    }
    else if(type == 'rapidkonsult'){
        rapidkonsultService.scrapeRapidkonsult(req, res);
    }else if(type == 'godit'){
        goditService.scrapegodit(req, res);
    }
    else if(type == 'gabertpartners'){
        gabertpartnersService.scrapegabertpartners(req,res);
    }else if(type == 'keyman'){
        keymanService.scrapekeyman(req, res);
    }
});

app.get('/api/users', function(req, res){
    User.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

app.post('/api/users', function(req, res){
    User.create({
        name : req.body.name,
        done : false
    }, function(err, user){
        if(err){
            res.send(err);
        }
        User.find(function(err, users){
            if(err){
                res.send(err);
            }
            res.json(users);
        });
    });
});


//DB modules
var User  = mongoose.model('User',{
    name: String
});

app.get('*', function(req, res) {
    res.sendfile(__dirname +'/public/index.html');
});