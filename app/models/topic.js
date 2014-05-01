'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * EventSchema Schema
 */
var TopicSchema = new Schema({
  id: {type: String, required: true},
  hasProcessed: Boolean,
	thumbnail: String,
	preferredLabel: String,
	type: String,
	longitude: Number,
	latitude: Number
});

mongoose.model('Topic', TopicSchema);
