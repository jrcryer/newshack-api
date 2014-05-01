'use strict';

exports.storylines = require('./tasks/storylines');
//exports.geonames = require('./tasks/geonames');

setInterval(function(){
	console.log('Run storylines task');
	exports.storylines.processNew();	
}, 10000);

