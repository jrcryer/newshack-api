'use strict';

exports.storylines = require('./tasks/storylines');
//exports.geonames = require('./tasks/geonames');

function processStorylines(){
	console.log('Run storylines task');
	exports.storylines.processNew();		
}

setInterval(processStorylines, 10000);
processStorylines();

