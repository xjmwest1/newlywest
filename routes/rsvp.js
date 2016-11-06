var express = require('express');
var router = express.Router();


var rsvp = require('../core/mongo/rsvp');

router.get('/:lastname', function(req, res, next) {
  rsvp.findByLastName(req.params.lastname).then(function(rsvps) {
    res.status(200).json(rsvps);
  }, function(err) {
    res.status(500).json(err.stack);
  });
});

router.get('/first/:firstname/last/:lastname', function(req, res, next) {
  rsvp.findByName(req.params.firstname, req.params.lastname).then(function(rsvp) {
    res.status(200).json(rsvp);
  }, function(err) {
    res.status(500).json(err.stack);
  });
});

router.post('/', function(req, res, next) {
  rsvp.add(req.body).then(function(rsvp) {
    res.status(200).json(rsvp);
  }, function(err) {
    res.status(500).json(err.stack);
  });
});

module.exports = router;
