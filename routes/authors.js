var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('mongodb://chill-admin:Perm*9mav@ds157571.mlab.com:57571/bloghouse', { useUnifiedTopology: true });

router.get('/show/:author', function(req, res, next) {
    var posts = db.get('posts');

    posts.find({author: req.params.author},{},function(err, posts){
      res.render('index',{
        'title': req.params.author,
        'posts': posts
      });
    });
});

router.get('/add', function(req, res, next) {
    res.render('addauthor',{
      'title': 'Add Author'
    });
});

router.post('/add',  function(req, res, next) {
  // Get Form Values
  var name = req.body.name;

  // Form Validation
    req.checkBody('name', 'Name field is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
      res.render('addpost',{
        "errors": errors
      });
    } else {
        var authors = db.get('authors');
        authors.insert({
          "name": name,
        }, function(err, post){
            if(err){
              res.send(err);
            }else {
              req.flash('success', 'Author Added');
              res.location('/');
              res.redirect('/');
            }
        });
    }
});

module.exports = router;