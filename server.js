'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var shortener = require('./app/routes/shortener.js');
var mongo = require('mongodb').MongoClient;


var app = express();
    require('dotenv').load();
    mongo.connect('mongodb://localhost:27017/clementinejs', function (err, db) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }
    
    
    routes(app);
    shortener(app,db);
    var port = process.env.PORT || 8080;
    app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

});