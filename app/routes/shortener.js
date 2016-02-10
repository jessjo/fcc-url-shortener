'use strict';
var mongo = require('mongodb').MongoClient;
var UrlHandler = require(process.cwd() + '/app/controllers/urlcollections.server.js');

module.exports = function (app, db) {

  
app.route('/:url')
  .get(function (req, res) {
    var newUrl = req.params.url;
     var urlHandler = new UrlHandler(db, newUrl);
     
       var urlDB = db.collection('urls');
        var urlProjection =  { '_id': false };
      
    //verify if URL exists and direct to page. Otherwise, get URL
     
      urlDB.findOne({'url': newUrl}, urlProjection, function (err, result) {
       if (err) {
         throw err;
      }
  
      if (result) {
       
        res.send(result);
       }else {
 
    

  
  //creates a new URL is one doesn't exist
       urlHandler.getURLs();
    //finds URL to post on page
       urlDB.findOne({'url': newUrl}, urlProjection, function (err, result) {
       if (err) {
         throw err;
      }
  
      if (result) {
       
        res.send(result);
       }
       })
       
       } 
       })
});

};



