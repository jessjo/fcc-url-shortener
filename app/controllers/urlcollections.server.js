'use strict';

function urlHandler (db, passedURL, res1) {
   var alphanum = "ABCDEFGHIJKLMNOPQRSTUVXYZ1234567890";
   var urlDB = db.collection('urls');
   function getCount(done){
      urlDB.find().count(function (e, count) {
          done(count);
       });
   }

this.getURLs = function (req, res) {

      var urlDB = db.collection('urls');
      var urlProjection =  { '_id': false };
       urlDB.findOne({'url': passedURL}, urlProjection, function (err, result) {
       if (err) {
         throw err;
      }
  
      if (result) {
          console.log("I found result");
      } else {
      getCount(function(count,res){
         
         var urlVal ="https://url-shortener-jessjo.c9users.io/"+ count;
           urlDB.findOne({'new-url': urlVal}, urlProjection, function (err, result) {
             if (err) {
                throw err;
             }
  
             if (result) {
                 urlVal += "a";
             }
           });
          urlDB.insert({ 'url': passedURL, 'new-url':  urlVal }, function (err) {
            if (err) {
                throw err;
            }
           res1.send ({ 'url': passedURL, 'new-url':  urlVal });
          
        });
        
     })
          
       }
       })
     
};
   
}

module.exports = urlHandler;