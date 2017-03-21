var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyC8OxlMc0mMHSuNl9KFotB4a1wKKJgaXWE",
    authDomain: "newlywest-5f428.firebaseapp.com",
    databaseURL: "https://newlywest-5f428.firebaseio.com",
    storageBucket: "newlywest-5f428.appspot.com",
    messagingSenderId: "575618030905"
};

firebase.initializeApp(config);

module.exports = firebase;