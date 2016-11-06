var mongodb = require('mongodb');

var mlab_user = 'newlywestsite';
var mlab_pass = 'johnjess01';


module.exports = mongodb.MongoClient.connect('mongodb://' + mlab_user + ':' + mlab_pass + '@ds033015.mlab.com:33015/newlywest');