var express = require('express');
var Hashes = require('jshashes');
var uuid = require('uuid/v4');
var request = require('request');
var querystring = require('querystring');
var router = express.Router();

/* GET home page. */

var sha1 = new Hashes.SHA1;

// TODO: query parameter lol
router.get('/go', function(req, res, next) {
  // Attempt to load the GO Transit feeeed from the Twitter
  test("GOtransit", res);
});

router.get('/ttc', function (req, res, next) {
  test("TTCnotices", res)
});

test = function(feedName, ourResponse) {
  //var headers = new Headers();
  var host = "https://api.twitter.com";
  var path = "/1.1/statuses/user_timeline.json?screen_name=" + feedName + "&count=30&exclude_replies=true";

  var url = host + path;

  var oauth = {
    consumer_key: "fhExW0UGJvYAnpsdYxyS8no4g",
    consumer_secret: "LzDx5RDf2m5qR6P7W255aKnEvWIJtNQPcMpCjJtJa2Twp6eSoi",
    token: "849306920724910081-7X9vVgYjvFq7qp73hI59o007AqtOhxd",
    token_secret: "zJiFdDoxccMgAAyUXme9if6bbGgvobATsTiYoUNVO2V2c"
  }

  // TODO: Cache for a couple minutes

  request.get({url: url, oauth: oauth, json: true}, function(e, r, body) {
    ourResponse.send(body);
  });
}


module.exports = router;
