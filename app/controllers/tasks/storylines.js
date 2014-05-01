'use strict';

var mongoose = require('mongoose'),
  Storyline = mongoose.model('Storyline'),
  Event = mongoose.model('Event'),
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
      processStoryline(storylines[0]);

    }
  });
};

function processStoryline(storyline) {
  console.log('Processing Storyline:', storyline.uri);
  fetchStorylineByUri(storyline.uri, function(data) {
    //console.log('Storyline data:', data);
    if (data) {
      populateStoryline(storyline, data);
    }
  });
}

function populateStoryline(storyline, data) {
  console.log('Updating Storyline:', storyline.uri);

  var storylineData = data['@graph'][0];
  console.log('storylineData', storylineData);
  storyline.title = storylineData.title;
  storyline.synopsis = storylineData.synopsis;
  storyline.slug = storylineData.slug;
  storyline.hasProcessed = true;

  processEvents(storyline, data['@graph']);

  storyline.save(function (err) {
    if (!err) {
    } else {
      console.log('Error updating Storyline', storyline.uri);
    }
  });

  
}

function processEvents(storyline, graph) {
  var events = [];
  graph.forEach(function(data){
    if ('Event' === data['@type']) {
      events.push({
        id: data['@id'],
        eventStartDate: data.eventStartDate,
        preferredLabel: data.preferredLabel
      });

      api.events.findById(data['@id'], function(event){
        if (!event) {
          processEvent(data);    
        } else {
          console.log('Event already exists');
        }
      });
      
    }
  });
  storyline.events = events;
}

function processEvent(data) {
  console.log('Processing new Event', data['@id']);
  var now = Date();
  var event = new Event({
    id: data['@id'],
    created: now,
    modified: now,
    hasProcessed: false,
    preferredLabel: data.preferredLabel,
    eventStartDate: data.eventStartDate
  });
  event.save(function (err) {
    if (!err) {
    } else {
      console.log('Error saving new Event for', event.id);
    }
  });
}

function fetchStorylineByUri(uri, callback) {
  
  var options = {
    url: 'http://data.bbc.co.uk/v1/bbcrd-newslabs/storylines/graphs?uri=' +uri +'&apikey=1f8pZnfSQ39jYHO2AsQdondu65SgBDUI',
    headers: {
      //'Accept': 'application/json-ld'
    },
    proxy: httpProxy
  };

  console.log('options.url', options.url);

  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      body = JSON.parse(body);
      callback(body);
    } else {
      console.log('Storyline request error', response.statusCode, error);
      callback();
    }
  });
}



