'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Storyline Schema
 */
var StorylineSchema = new Schema({
  uri: {type: String, required: true},
  hasProcessed: Boolean,
  created: Date,
  modified: Date,
  preferredLabel: String,
  events: Object
});

mongoose.model('Storyline', StorylineSchema);
