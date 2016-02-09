'use strict';
var mongo = require('mongodb').MongoClient;
var urlHandler = require(process.cwd() + '/app/controllers/urlcollections.server.js');

module.exports = function (app, db) {
app.route('/:url')
  .get(function (req, res) {
    var newUrl = req.params.url;
    res.send("success");
});

};



