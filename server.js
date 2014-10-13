/**
 * Created by Zem on 2014-10-10.
 */
// set up ========================
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var eworksService = require('./scrape/eworksservice');
var rapidkonsultService = require('./scrape/rapidkonsultservice');
var goditService = require('./scrape/goditservice');
var gabertpartnersService = require('./scrape/gabertpartnersservice');
var keymanService = require('./scrape/keymanservice');

// configuration =================

mongoose.connect('mongodb://fmf:fmfadmin@linus.mongohq.com:10000/findmyfriend');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.set('port', (process.env.PORT || 5000));

// Start server ======================================
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});

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


app.get('*', function(req, res) {
    res.sendfile(__dirname +'/public/index.html');
});