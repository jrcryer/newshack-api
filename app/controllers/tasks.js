'use strict';

exports.storylines = require('./tasks/storylines');
//exports.geonames = require('./tasks/geonames');

setInterval(function(){
	exports.storylines.processNew();	
}, 5000);

