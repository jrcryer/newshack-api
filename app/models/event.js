'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * EventSchema Schema
 */
var EventSchema = new Schema({
  id: String,
  hasProcessedCreativeWorks: Boolean,
  creativeWorksPage: Number,
  disambiguationHint: String,
  preferredLabel: String,
  title: String,
  synopsis: String,
  topic: Array
});

mongoose.model('Event', EventSchema);
