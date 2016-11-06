var mongodb = require('./mongo');
var COLLECTION = 'rsvp';

var functions = {
  get: getRsvp,
  add: addRsvp,
  update: updateRsvp,
  delete: deleteRsvp,
  findByName: findRsvpByName,
  findByLastName: findRsvpsByLastName
}

function getRsvp(id) {
  
  return mongodb.then(function(db) {  
    return db.collection(COLLECTION).findOne({_id: id}).then(function(result) {
      return result;
    }, function(err) {
      return err;
    });
  });
  
}

function addRsvp(rsvp) {
  
  return mongodb.then(function(db) {  
    return db.collection(COLLECTION).insertOne(rsvp).then(function(result) {
      return result;
    }, function(err) {
      return err;
    });
  });
  
}

function updateRsvp(rsvp) {
  
}

function deleteRsvp(id) {
  
}

function findRsvpByName(firstname, lastname) {
  
   return mongodb.then(function(db) {  
    return db.collection(COLLECTION).findOne({first: firstname, last: lastname}).then(function(result) {
      return result;
    }, function(err) {
      return err;
    });
  });

}

function findRsvpsByLastName(lastname) {
  
  // returns only 1
  /*return mongodb.then(function(db) {  
    return db.collection(COLLECTION).findOne({last: {$regex: lastname} }).then(function(result) {
      return result;
    }, function(err) {
      return err;
    });
  });*/
  
  return mongodb.then(function(db) {  
    return new Promise(function(resolve, reject) {
      db.collection(COLLECTION).find({last: {$regex: lastname} }).toArray(function(err, items) {
        if(err) {
          reject(err);
        }else {
          resolve(items);
        }
      });
    });
  });

}

module.exports = functions;