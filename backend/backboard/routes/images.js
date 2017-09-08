var express = require('express');
var fs = require('fs');

var router = express.Router();

// The directory we are storing random images
var randomImagesDirectory = "public/images/random";

/* GET images listing. */
router.get('/', function(req, res, next) {
  // Load the list of images from the images directory and return it
  fs.readdir(randomImagesDirectory, function(err, items) {
    if (err) {
      console.log(err);
      res.send("ERROR ERROR ERROR");
    }

    console.log(items);
    res.send(items);
  })
});

module.exports = router;
