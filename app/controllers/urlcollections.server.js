'use strict';

function urlHandler (db, passedURL) {
   var urlDB = db.collection('urls');
   this.getURLs = function (req, res) {

  var urlProjection = { '_id': false };

   urlDB.findOne({}, urlProjection, function (err, result) {
     if (err) {
        throw err;
     }

     if (result) {
        res.json(result);
     } else {
        urlDB.insert({ 'url': passedURL  }, function (err) {
           if (err) {
              throw err;
           }

           urlDB.findOne({}, urlProjection, function (err, doc) {
              if (err) {
                 throw err;
              }
            console.log(doc + "this is a line of logging you added");
              res.json(doc);
           });
        });
     }
  });
};
   
}

module.exports = urlHandler;