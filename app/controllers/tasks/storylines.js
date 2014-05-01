'use strict';

var mongoose = require('mongoose'),
  Storyline = mongoose.model('Storyline'),
  request = require('request'),
  api = require('../api');

var httpProxy = process.env.http_proxy;

/**
 * Process any new storylines
 */
exports.processNew = function() {
      
  console.log('Process new storylines.');

  api.storylines.findByQuery({hasProcessed: false}, null, function(storylines){
    if (storylines.length) {
      console.log('');
      console.log('Processing 1 of', storylines.length, 'new storylines.');
      //processStoryline(storylines[0]);

    }
  });
};



