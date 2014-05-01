define([
  'jquery', 
  'backbone', 
  'views/storylinenav'
], function(
  $, 
  Backbone, 
  StorylineNavView
){

	var ProjectModel = Backbone.Model.extend({
	  url : function() {
	    return '/api/projects/' + this.id;
	  }
	});

	return ProjectModel;
});