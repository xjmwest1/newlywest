var express = require('express');
var router = express.Router();

var firebase = require('../repositories/firebase');
var rsvpRef = firebase.database().ref('rsvp');

var rsvp = require('../mongo/rsvp');


router.get('/:firstname/:lastname', function(req, res, next) {
    
  rsvpRef.orderByChild('name').equalTo(req.params.firstname.toLowerCase() + ' ' + req.params.lastname.toLowerCase()).limitToFirst(1).once('value', function(snapshot) {
    var val = snapshot.val();
    res.status(200).json(val ? val[Object.keys(val)[0]] : false);
  });

});

router.get('/:accept?', function(req, res, next) {
  var yesOrNo = req.params.accept ? req.params.accept.toLowerCase() === 'yes' ? 'true' : 'false' : null;

  rsvpRef.orderByChild('name').once('value', (snapshot) => {
    var val = snapshot.val();
    // convert to array
    var array = [];
    Object.keys(val).forEach((key) => { array.push(val[key]) });
    if(yesOrNo) {
      array = array.filter((item) => { return item.accept === yesOrNo });
    }
    res.status(200).json(array);
  });

});

router.post('/', function(req, res, next) {
  
  var rsvp = req.body;
  rsvpRef.push(rsvp, (err) => {
    err ? res.status(500).json(err) : res.status(200).json(true);
  });

});


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
