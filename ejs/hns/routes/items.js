var express = require('express');
var router = express.Router();

var monk = require('monk');
const { render } = require('../app');
var db = monk('localhost:27017/hns');

var collection = db.get('items');

// /items
router.get('/', function(req, res, next) {
    collection.find({}, function(err, items) {
        if (err) throw err;
        res.render('viewall', {results : items});
    })
});

// /items/id/uid - this is only for customers
router.get('/:id/:uid', function(req, res, next) {
    collection.findOne({ _id: req.params.id}, function(err, item){
        if (err) throw err;
        res.render('view_for_user', {item : item, user: req.user});
    });
  });

router.post('/cart/:id/:uid', function(req, res, next) {
    console.log(req.params.id);
    res.render('add');
});

// /items/id

router.get('/:id', function(req, res, next) {
  collection.findOne({ _id: req.params.id}, function(err, item){
      if (err) throw err;
      res.render('view', {item : item});
  });
});

router.post('/', function(req, res, next) {
    collection.insert({
        title: req.body.title,
        description: req.body.desc,
        category: req.body.category,
        image: req.body.image,
        is_delete: false
    }, function(err, item) {
        if (err) throw err;
        res.redirect("/items");
    })
});

router.get('/edit/:id',function(req,res) {
    console.log("hi");
  collection.findOne({_id : req.params.id}, function(err,item){
      if (err) throw err;
      console.log(item);
      res.render('show_copy', {item: item});
  });
});

router.put('/:id',function(req,res) {
    console.log(req.body);
    collection.update({ _id : req.params.id },
    { $set:
    {
        title: req.body.title,
        description: req.body.desc,
        category: req.body.category,
        image: req.body.image,
    }}, function(err, item) {
        if (err) throw err;
        res.redirect("/items");
    })
  });

// soft delete an existing item
router.put('/delete/:id', function(req, res) {
    console.log(req.body);
    res.redirect('/items');
    // collection.update({ _id : req.params.id },
    //     { $set:
    //     {
    //         is_delete: true
    //     }}, function(err, item) {
    //         if (err) throw err;
    //         res.redirect('/items'); // redirect to home page and show items only with is_delete=false
    //     })
});

module.exports = router;
