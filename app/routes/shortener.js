
'use strict';
var mongo = require('mongodb').MongoClient;
var UrlHandler = require(process.cwd() + '/app/controllers/urlcollections.server.js');
var async = require('async');
var urlregex = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);

module.exports = function (app, db) {

  
app.route(/^\/(.+)/)
  .get(function (req, res) {
    var newUrl = req.params[0];
    
     var urlHandler = new UrlHandler(db, newUrl, res);
    
      var urlDB = db.collection('urls');
      var urlProjection =  { '_id': false };
       urlDB.findOne({'url': newUrl}, urlProjection, function (err, result) {
       if (err) {
         throw err;
      }
      if (result) {
          //URL already made, show existing URL
                res.send(result);
         
       } else {
             
           //this is where I end up if results don't exist yet.
             urlDB.findOne({'new-url': "https://url-shortener-jessjo.c9users.io/" + newUrl}, urlProjection, function (err, result) {
              if (err) {
                throw err;
              }
              if (result) {
                  var urlHttp = result["url"];
                  if (result["url"].substr(0,4) != "http"){
                    urlHttp = "http://" + urlHttp;
                    console.log(urlHttp);
                  }
                  res.redirect(urlHttp);
                 
               
               } else {
                if (!urlregex.test(newUrl)){
                    res.send("Error, URL not properly formatted");
                    return;
                 }
           
                urlHandler.getURLs();
               }
             })
         
       }
       })

});

};
