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
    res.json(storyline); 
  });
};
