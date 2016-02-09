'use strict';

module.exports = function (app) {
app.route('/')
  .get(function (req, res) {
    console.log("Index visit")
    res.sendFile(process.cwd() + '/public/index.html');
});

};
