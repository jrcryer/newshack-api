'use strict';

var mongoose = require('mongoose'),
Storyline = mongoose.model('Storyline');

exports.get = function(req, res) {
  var storylineId = req.params.id, storyline;
  exports.findByQuery({id: storylineId}, {dateCreated: 1}, function(storylines){
    if (!storylines || 0 === storylines.length) {
        return res.send('No storyline matching id ' +storylineId);
    }
    storyline = storylines[0];

  });
};

exports.delete = function(req, res) {
  Storyline.remove({_id: req.params.id }, function(err, storyline){
    if (err) {
      res.json({error: err}); 
    } else {
      res.json({message: 'deleted'}); 
    }
  });
};

/**
 * List resources
 */
exports.list = function(req, res) {
  return Storyline.find(function (err, storylines) {
    if (!err) {
      return res.json(storylines);
    } else {
      return res.send(err);
    }
  });
};

/**
 * Create user
 */
exports.create = function(req, res) {
  var now = new Date();
  var storyline = new Storyline({
    uri: req.body.uri,
    title: req.body.title,
    synopsis: req.body.synopsis,
    hasProcessed: false,
    created: now,
    modified: now
  });
  storyline.save(function (err) {
    if (!err) {
      return res.json(storyline);
    } else {
      return res.send(err);
    }
  });
};

/**
 * Update user
 */
exports.update = function(req, res) {
  Storyline.findOne({uri: req.params.uri}, function(err, storyline){
    if (!err) {
      storyline.increment();
      storyline.modified = new Date();
      storyline.save(function (err) {
        if (!err) {
          return res.json(storyline);
        } else {
          return res.send(err);
        }
      });
    } else {
      return res.send(err);
    }
  });
};

/**
 * Query for storylines
 */
exports.findByQuery = function(query, sort, callback) {
  Storyline.find(query).sort(sort).exec(function(err, storylines){
    if (!err) {
      callback(storylines);
    } else {
      callback();
    }
  });
};

