var express = require('express');
var router = express.Router();
var url = require("url");

var db = require(__dirname + '/mongo.js').model;

//console.log( db );


// remove all
//db.find().remove().exec();

router.get('/api/pages', function(req, res, next){
    var data = db.find();
    data.then(function(doc){
      console.log( ' find pages ', doc);
      res.json(doc);
    });
});

router.post('/api/pages', function(req, res, next){
      if ( !req.body.name || !req.body.body) {
        res.json({error: true, msg: 'no name or body was provided'});
        return ;
      }
      var post = new db({
        name : req.body.name,
        body : req.body.body
      });
      post.save(function (err, result) {
        console.log(result);
        res.json(result);
      });
});

router.put('/api/pages', function(req, res, next){
      if ( !req.body.id || !req.body.name || !req.body.body) {
        res.json({error: true, msg: 'no name or body or id was provided'});
        return ;
      }
      db.findById(req.body.id, function(err,doc){
        if (err) {
          res.json({error: true, msg: 'no items was found'});
          return ;
        }
        doc.name = req.body.name;
        doc.body = req.body.body;
        doc.save(function (err, result) {
          console.log(result);
          res.json(result);
        });
      });
});


router.delete('/api/pages', function(req, res, next){
  var parts = url.parse(req.url, true);
  var id = parts.query.id;
  console.log( parts );
      if ( !id ) {
        res.json({error: true, msg: 'no id was provided'});
        return ;
      }
      db.findByIdAndRemove(id ,function(err, result){
        console.log(result);
        res.json(result);
      });
});


router.get('*',function (req, res) {
       res.sendFile( __dirname + '/public/index.html' );
});

console.log('router is running');


module.exports = router;
