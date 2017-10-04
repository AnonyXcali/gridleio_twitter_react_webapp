var express = require('express');
var router = express.Router();
var fetch = require('whatwg-fetch');
var request = require('request');
var twitter = require('twitter');

var client = new twitter({
  consumer_key: "your-credentials",
  consumer_secret: "your-credentials",
  access_token_key: "your-credentials",
  access_token_secret: "your-credentials"
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');



  var params = {screen_name: req.query.screen_name,
    count : req.query.count
  };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {

      console.log(tweets);
      res.json(tweets);
    }
  });





});


router.get('/like', function(req, res, next) {
  // res.send('respond with a resource');



  var params = {id: req.query.id,
  };
  client.post('favorites/create', params, function(error, tweets, response) {
    if (!error) {
      console.log("Like ho gaya" + response);
      res.json(tweets);
    }else{
      res.json(error);
    }
  });





});

module.exports = router;
