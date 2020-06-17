var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('mongodb://chill-admin:Perm*9mav@ds157571.mlab.com:57571/bloghouse', { useUnifiedTopology: true });

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var posts = db.get('posts');
  posts.find({}, {}, function(err, posts){
    res.render('index', { posts: posts });
  });
});

module.exports = router;
