'use strict';

var mongoose = require('mongoose'),
Topic = mongoose.model('Topic');

/**
 * List topics
 */
exports.list = function(req, res) {

  return Topic.find(function (err, topics) {
    if (!err) {
      return res.json(topics);
    } else {
      return res.send(err);
    }
  });

};

/**
 * Get Event by id
 */
exports.findById = function(id, callback) {
  exports.findByQuery({id: id}, null, function(topics){
    if (topics) {
      callback(topics[0]);
    } else {
      callback();
    }
  });
};

/**
 * Query for topics
 */
exports.findByQuery = function(query, sort, callback) {
  Topic.find(query).sort(sort).exec(function(err, topics){
    if (!err) {
      callback(topics);
    } else {
      callback();
    }
  });
};

