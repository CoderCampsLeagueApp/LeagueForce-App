var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Inbox = mongoose.model('Inbox');
var User = mongoose.model('User');
var jwt = require('express-jwt');

var auth = jwt({
  'userProperty': 'payload',
  'secret': '_secret_sauce'
});

router.post('/post', auth, function(req,res){
  var msg = new Inbox(req.body);  
  msg.messages[0].created = new Date();
  msg.messages[0].sender = req.payload.id;
  msg.isdeleted = false;
  msg.user1 = req.payload.id;
  console.log(msg);
  msg.save(function(err, result){
    if (err) return res.status(500).send({
            err: "Server Error"
      });
      if (!result) return res.status(400).send({
            err: "Could not create message"
      });
        var id = result._id;
        User.update({_id: msg.user1}, {$push: {
          messages: {_id: id}
        }}, function(err, result){
        User.update({_id: msg.user2}, {$push: {
          messages: {_id: id}
        }}, function(err, result){
          res.send(); 
        });
      });
  
    });
});
router.get('/:id', auth, function(req,res){
  var id = req.params.id;
  Inbox.find({
  $or : [ { user1 : id }, {user2:id} ] 
     })
  .populate({
    path: 'user1',
    model: 'User',
    select : 'name pic'
  }).populate({
    path: 'user2',
    model: 'User',
    select : 'name pic'
  })
  .exec(function(err, result){
    if(err) return res.status(500).send({err: "The server is having issues."});
    if(!result) return res.status(400).send({err: "Could not get the messages."});
      res.send(result);
    });
});

//Message replies
router.post('/reply', auth, function(req, res){
  var message = req.body;
  message.created = new Date();
  message.sender = req.payload.id;
  var id = message.body;
  delete message.body;
  console.log(message);
  
  Inbox.update({_id: id},
    {$push: {body:  message}} )
  .exec(function(err, result){
    if(err) return res.status(500).send({err: "The server is having issues."});
    if(!result) return res.status(400).send({err: "Could not push the reply."});
    res.send(message);
  });
});

module.exports = router;
