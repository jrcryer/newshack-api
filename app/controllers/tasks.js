'use strict';

exports.storylines = require('./tasks/storylines');
exports.newsItems = require('./tasks/newsItems');

function processStorylines(){
	//console.log('Run storylines task');
	exports.storylines.processNew();		
}

function processNewsItems(){
	//console.log('Run newsItems task');
	exports.newsItems.processNew();		
}

setInterval(processStorylines, 10000);
processStorylines();

setInterval(processNewsItems, 1000);
processNewsItems();

