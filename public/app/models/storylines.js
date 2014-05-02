define([
  'jquery', 
  'backbone'
], function(
  $, 
  Backbone
){

	var StorylinesModel = Backbone.Model.extend({
	  url : function() {
	    return '/api/storylines/'
	  }
	});

	return StorylinesModel;
});