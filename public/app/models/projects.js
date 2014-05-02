define([
  'jquery', 
  'backbone'
], function(
  $, 
  Backbone
){

	var ProjectsModel = Backbone.Model.extend({
	  url : function() {
	    return '/api/projects/';
	  }
	});

	return ProjectsModel;
});