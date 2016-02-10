'use strict';

function urlHandler (db, passedURL) {
   var alphanum = "ABCDEFGHIJKLMNOPQRSTUVXYZ1234567890";
   var urlDB = db.collection('urls');
   function getCount(done){
      urlDB.find().count(function (e, count) {
          done(count);
       });
   }

   this.getURLs = function (req, res) {

  var urlProjection = { '_id': false };

   urlDB.findOne({'url': passedURL}, urlProjection, function (err, result) {
     if (err) {
        throw err;
     }

     if (result) {
       return(result);
     } else {
      getCount(function(count){
         //var cur = count/alphanum.length;
        // console.log(cur);
         var urlString = "https://url-shortener-jessjo.c9users.io/"+count;
   
         
          urlDB.insert({ 'url': passedURL, 'new-url': urlString  }, function (err) {
            if (err) {
                throw err;
            }
   
             urlDB.findOne({}, urlProjection, function (err, doc) {
               if (err) {
                   throw err;
                 }
               return(doc);
           });
        });
        
     })
     }
  });
};
   
}

module.exports = urlHandler;