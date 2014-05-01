'use strict';

var mongoose = require('mongoose'),
  Storyline = mongoose.model('Storyline'),
  Event = mongoose.model('Event'),
  NewsItem = mongoose.model('NewsItem'),
  Topic = mongoose.model('Topic'),
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
  storyline.title = storylineData.title;
  storyline.synopsis = storylineData.synopsis;
  storyline.slug = storylineData.slug;
  storyline.hasProcessed = true;

  processTopics(storyline, storylineData.topic['@set']);
  processEvents(storyline, data['@graph']);

  storyline.save(function (err) {
    if (!err) {
    } else {
      console.log('Error updating Storyline', storyline.uri);
    }
  });

  
}

function processTopics(storyline, topicsData) {
  var topic, topics = [];
  topicsData.forEach(function(data){
    topic = {
      thumbnail: data.thumbnail,
      preferredLabel: data.preferredLabel,
      type: data['@type'],
      id: data['@id'],
      longitude: data.long,
      latitude: data.lat
    };

    topics.push(topic);

    api.topics.findById(topic.id, function(result){
      if (!result) {
        processTopic(data);    
      } else {
        console.log('Topic already exists');
      }
    });
  });
  storyline.topics = topics;
}

function processTopic(data) {
  console.log('Processing new Topic', data['@id']);
  var now = Date();
  var topic = new Topic({
    id: data['@id'],
    created: now,
    modified: now,
    hasProcessed: false,
    thumbnail: data.thumbnail,
    preferredLabel: data.preferredLabel,
    type: data['@type'],
    longitude: data.long,
    latitude: data.lat
  });
  topic.save(function (err) {
    if (!err) {
    } else {
      console.log('Error saving new Topic for', topic.id);
    }
  });
}

function processEvents(storyline, graph) {
  var event, events = [];
  graph.forEach(function(data){
    if ('Event' === data['@type']) {
      event = {
        id: data['@id'],
        eventStartDate: data.eventStartDate,
        preferredLabel: data.preferredLabel
      };
      processNewsItems(event, data.taggedOn['@set'])
      events.push(event);

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

function processNewsItems(event, newsItemsData) {
  var newsItem, newsItems = [];

  newsItemsData.forEach(function(data){

      newsItem = {
        product: data.product,
        title: data.title,
        description: data.description,
        dateCreated: data.dateCreated,
        thumbnail: data.thumbnail,
        id: data['@id'],
        identifier: data.identifier
      };

      newsItems.push(newsItem);

      api.newsItems.findById(newsItem['@id'], function(newsItem){
        if (!newsItem) {
          processNewsItem(data);    
        } else {
          console.log('NewsItem already exists');
        }
      });
      
  });
  event.newsItems = newsItems;
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

function processNewsItem(data) {
  console.log('Processing new NewsItem', data['@id']);
  var now = Date();
  var newsItem = new NewsItem({
    id: data['@id'],
    created: now,
    modified: now,
    hasProcessed: false,
    product: data.product,
    title: data.title,
    thumbnail: data.thumbnail,
    description: data.description,
    dateCreated: data.dateCreated,
    identifier: data.identifier
  });
  newsItem.save(function (err) {
    if (!err) {
    } else {
      console.log('Error saving new NewsItem for', newsItem.id);
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



