'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * EventSchema Schema
 */
var EventSchema = new Schema({
  id: {type: String, required: true},
  hasProcessed: Boolean,
  preferredLabel: String,
  eventStartDate: Date
});

mongoose.model('Event', EventSchema);
