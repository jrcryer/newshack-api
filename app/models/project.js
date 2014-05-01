'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
  created: Date,
  modified: Date,
  title: {type: String, required: true},
  storylineId: {type: String, required: true},
  storyline: Object
});

mongoose.model('Project', ProjectSchema);
