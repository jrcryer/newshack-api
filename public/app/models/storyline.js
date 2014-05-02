define([
  'jquery', 
  'backbone'
], function(
  $, 
  Backbone
){

	var StorylineModel = Backbone.Model.extend({
	  url : function() {
	    return '/api/storylines-expanded/' + this.id;
	  }
	});

	return StorylineModel;
});