'use strict';

var mongoose = require('mongoose'),
Event = mongoose.model('Event');

/**
 * Get Event by id
 */
exports.findById = function(id, callback) {
  exports.findByQuery({id: id}, null, function(events){
    if (events) {
      callback(events[0]);
    } else {
      callback();
    }
  });
};

/**
 * Query for storylines
 */
exports.findByQuery = function(query, sort, callback) {
  Event.find(query).sort(sort).exec(function(err, events){
    if (!err) {
      callback(events);
    } else {
      callback();
    }
  });
};

