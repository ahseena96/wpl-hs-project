var express = require('express');
var router = express.Router();

var monk = require('monk');
const { render } = require('../app');
var db = monk('localhost:27017/hns');

var collection = db.get('items');

// /items
router.get('/', function(req, res, next) {
    // console.log(req.user);
    collection.find({}, function(err, items) {
        if (err) throw err;
        console.log(req);
        res.render('viewall_users', {results: items, user: req.user});
    })
});

// /items/id

router.get('/:id', function(req, res, next) {
  collection.findOne({ _id: req.params.id}, function(err, item){
      if (err) throw err;
      res.render('view', {item : item});
  });
});


module.exports = router;
