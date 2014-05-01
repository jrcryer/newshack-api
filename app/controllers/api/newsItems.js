'use strict';

var mongoose = require('mongoose'),
NewsItem = mongoose.model('NewsItem');

/**
 * List resources
 */
exports.list = function(req, res) {

  return NewsItem.find(function (err, newsItems) {
    if (!err) {
      return res.json(newsItems);
    } else {
      return res.send(err);
    }
  });

};

/**
 * Get news item by id
 */
exports.findById = function(id, callback) {
  exports.findByQuery({id: id}, null, function(newsItems){
    if (newsItems) {
      callback(newsItems[0]);
    } else {
      callback();
    }
  });
};

/**
 * Query for news items
 */
exports.findByQuery = function(query, sort, callback) {
  NewsItem.find(query).sort(sort).exec(function(err, newsItems){
    if (!err) {
      callback(newsItems);
    } else {
      callback();
    }
  });
};

