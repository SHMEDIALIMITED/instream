'use strict';

var Thing = require('../thing/thing.model');
var Instagram = require('instagram-node-lib');


var token = require('crypto').randomBytes(64).toString('hex');

Instagram.set('client_id', '4d3064d3d6824913b650d292d32c891e');
Instagram.set('client_secret', 'd46a3afcd78446699bc35243836ac062');
Instagram.set('callback_url', 'http://instream.ngrok.com/api/streams');


var tag = 'keeponpushing';

Instagram.tags.unsubscribe_all({
  complete: function(err) {
    console.log('Unsubscribe error', err);
    Instagram.tags.subscribe({ object_id: tag, verify_token: token });
  }
});




// Get list of streams
exports.verify = function(req, res) {
  if(req.query['hub.verify_token'] === token) {
    res.send(req.query['hub.challenge'])
  } else {
    res.send(401);
  }
};


// Creates a new stream in the DB.
exports.create = function(req, res) {

  Instagram.tags.recent({

    name: tag,

    count: 1,

    complete: function(data) {

      var thing = new Thing({
        data : data
      });

      thing.save(function(err, doc) {
        console.log('SAVED', doc);
      });

    },

    error : function(err) {
      console.log('Error', err)
    }

  });

  console.log('>>>>>' ,req.body);
};


function handleError(res, err) {
  return res.send(500, err);
}
