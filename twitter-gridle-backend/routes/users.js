var express = require('express');
var router = express.Router();
var fetch = require('whatwg-fetch');
var request = require('request');
var twitter = require('twitter');

var client = new twitter({
  // consumer_key: 'Your credentials',
  // consumer_secret: 'Your credentials',
  // access_token_key: 'Your credentials',
  // access_token_secret: 'Your credentials'
  consumer_key: 'X91LplW0ZVD5fpH3yxZ042SXj',
  consumer_secret: 'ulHsYGdop4Ft9QzVdFjnPgfHsWcZathy5T5C3ou1ucC7sYbbGJ',
  access_token_key: '579852381-5aeoVqFNcGywGCcsX8AvDr66tL3JDmV0IkLjwjw1',
  access_token_secret: 'j88QEvTNBND7HyktblSprK7LFoXAaQ4qxYvIwvCZ82Qf8'
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
    }else{
      console.log(error);
      res.json(error);
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
