'use strict';

var mongoose = require('mongoose'),
  NewsItem = mongoose.model('NewsItem'),
  Topic = mongoose.model('Topic'),
  request = require('request'),
  api = require('../api');

var httpProxy = process.env.http_proxy;

/**
 * Process any new storylines
 */
exports.processNew = function() {
      
  console.log('Process new news items.');

  api.newsItems.findByQuery({hasProcessed: false}, null, function(newsItems){
    if (newsItems.length) {
      console.log('');
      console.log('Processing 1 of', newsItems.length, 'new news items.');
      processNewsItem(newsItems[0]);

    }
  });
};

function processNewsItem(newsItem) {
  console.log('Processing NewsItem:', newsItem.id);
  if ('http://www.bbc.co.uk/ontologies/bbc/NewsWeb' === newsItem.product) {
    fetchBBCNewsItem(newsItem, function(data){
      console.log('Found BBC news item', data);

      if (!data.results || data.results.length === 0) {
        console.log('NewsItem has no data');
        newsItem.hasProcessed = true;
        newsItem.save(function(){});
      } else {
        processBBCNewsItem(newsItem, data.results[0]);
      }

    });
  } else {
    console.log('Found non-BBC news item.')
    newsItem.hasProcessed = true;
    newsItem.save(function(){});
  }
}

function processBBCNewsItem(newsItem, data) {
  if (data.thumbnail) {
    data.thumbnail.forEach(function(thumbnail){
      newsItem.images.push({
        url: data['@id'],
        altText: data.altText,
        type: data['@type'][0]
      });
    });
  }

  if (data.title) {
    newsItem.title = data.title;
  }

  if (data.shortTitle) {
    newsItem.shortTitle = data.shortTitle;
  }

  newsItem.hasProcessed = true;
  newsItem.save(function(){});
}

function fetchBBCNewsItem(newsItem, callback) {
  
  var options = {
    url: 'http://data.bbc.co.uk/ldp/creative-works?locator=urn:bbc:cps:asset:' +newsItem.identifier +'&api_key=2nwpqhv4stj468zpnsb7vuqn',
    headers: {
      'Accept': 'application/json-ld'
    },
    proxy: httpProxy
  };

  console.log('options.url', options.url);

  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      body = JSON.parse(body);
      callback(body);
    } else {
      console.log('BBC NewsItem request error', response.statusCode, error);
      callback();
    }
  });
}



