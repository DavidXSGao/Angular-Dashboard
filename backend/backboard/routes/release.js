var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
var releaseNotesPath = "data/release_status.json";

// Return the stored release object
router.get('/', function(req, res, next) {

  fs.readFile(releaseNotesPath, 'utf-8', function(e, r) {
    if (e) console.log(e);
    res.status(200).send(r);
  });
});

// Only other operation is to support PUT which stores the release object provided by the UI
// WARNING: very basic implementation, not secure
router.put('/', function(req, res, next) {
  // UI is trying to put an updated release version here.
  console.log(req.body);

  // TODO: Validation
  fs.writeFile(releaseNotesPath, JSON.stringify(req.body), function(err) {
    console.log(err);
  });
  console.log("Release notes have been updated");
  res.status(200).send(JSON.stringify(req.body));
});

module.exports = router;
