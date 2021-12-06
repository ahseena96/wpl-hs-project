var express = require('express');
var router = express.Router();

var monk = require('monk');
const { render } = require('../app');
var db = monk('localhost:27017/hns');

var collection = db.get('cart');
// var items = db.get('items');

// /cart
router.get('/', function(req, res, next) {
    collection.find({"user": req.user._id.toString()}, function(err, items) {
        if (err) throw err;
        console.log(items);
        console.log(req.user);
        console.log(req.user._id.toString());
        // console.log(req.user.title);
        res.render('viewcart', {results : items, user : req.user});
    })
});

// /cart post

router.post('/', function(req, res, next) {
    // /cart/id/pid
    collection.insert({
        item: req.body.itemid,
        itemname: req.body.title,
        price: req.body.price,
        image: req.body.image,
        user: req.body.userid,
        quantity: parseInt(req.body.quantity)
    }, function(err, item) {
        if (err) throw err;
        res.status(204).send();
    })
});


router.put('/:id',function(req,res) {
    console.log(req.body);
    collection.update({ _id : req.params.id },
    { $set:
    {
        quantity: req.body.quantity,
    }}, function(err, item) {
        if (err) throw err;
        res.redirect("/cart");
    })
  });

router.put('/remove/:id',function(req,res) {
    console.log(req.body);
    collection.update({ _id : req.params.id },
    { $set:
    {
        quantity: req.body.quantity,
    }}, function(err, item) {
        if (err) throw err;
        res.redirect("/cart");
    })
  });

// soft delete an existing item
router.put('/delete/:id', function(req, res) {
    console.log(req.body);
    collection.remove({ _id : req.params.id}, function(err, video) {
        if (err) throw err;
        res.redirect("/cart");
    })
});

module.exports = router;
