'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * NewsItem Schema
 */
var NewsItemSchema = new Schema({
  id: {type: String, required: true},
  hasProcessed: Boolean,
  created: Date,
  modified: Date,
	product: String,
	title: String,
	description: String,
	dateCreated: Date,
	identifier: String
});

mongoose.model('NewsItem', NewsItemSchema);
