'use strict';

var mongoose = require('mongoose'),
Storyline = mongoose.model('Storyline'),
api = require('../api');

exports.get = function(req, res) {
  var storylineId = req.params.id, storyline;
  api.storylines.findByQuery({_id: storylineId}, {dateCreated: 1}, function(storylines){
    if (!storylines || 0 === storylines.length) {
        return res.send('No storyline matching id ' +storylineId);
    }
    storyline = storylines[0];
    //exports.getNewsItemsByStoryline(storyline, function(){
    	res.json(storyline); 
    //});
  });
};

exports.getNewsItemsByStoryline = function(storyline, callback) {
	var ids = [];
	storyline.events.forEach(function(event){
		event.newsItems.forEach(function(newsItem){
			ids.push(newsItem.identifier);
		});
	});

	api.newsItems.findByQuery({identifier: {$in: ids}}, null, function(newsItems){
		console.log('newsItems', newsItems);
		console.log('newsItem[0]', newsItems[0]);
		callback();
	});
};