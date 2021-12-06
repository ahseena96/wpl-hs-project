var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/hns');
// var collection = db.get('items');

var passport = require('passport');
var Account = require('../models/account');
var collection = db.get('items');


// /* GET home page - admin */
// router.get('/', function(req, res, next) {
//   res.redirect('/signup');   // this should go to login.. admin login can go to this..
// });

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/cart/:id/:uid', function(req, res, next) {
  res.render('add');
});


router.get('/', function (req, res) {
  // if admin, go to items page
  // else go to users' items page
  if (req.user){
    if (req.user.usertype == "admin") {
      res.redirect('/items');
    }
    else if (req.user.usertype == "customer") {
      res.redirect('/useritems');
    }
  }
  else {
    res.render('index', { user : req.user });
  }
  
});

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username, usertype : req.body.usertype}), req.body.password, function(err, account) {
      if (err) {
          return res.render('register', { account : account });
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
  });
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



module.exports = router;
