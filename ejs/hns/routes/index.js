var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/hns');
// var collection = db.get('items');

var passport = require('passport');
var Account = require('../models/account');
var collection = db.get('items');
var order = db.get('orderhistory');


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

router.get('/edit/:id',function(req,res) {
  console.log("hi");
  collection.findOne({_id : req.params.id}, function(err,item){
    if (err) throw err;
    console.log(item);
    res.render('show_copy', {item: item});
});
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

router.post('/checkout', function(req, res) {
  console.log(req.body)
  order.insert({
    item: req.body.itemid,
    title: req.body.title,
    image: req.body.image,
    user: req.body.userid,
    quantity: parseInt(req.body.quantity),
    totalprice: req.body.price,
}, function(err, item) {
    if (err) throw err;
    res.status(204).send();
})
});

router.get('/orderhistory/:id', function(req, res) {
  order.find({user : req.params.id.toString()}, function(err,items){
    if (err) throw err;
    console.log(items);
    res.render('showorderhistory', {results: items});
});
});

router.get('/done', function(req, res) {
  res.render('orderhistory');
});

module.exports = router;
