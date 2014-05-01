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
  title: String,
  synopsis: String,
  slug: String
});

mongoose.model('Storyline', StorylineSchema);
