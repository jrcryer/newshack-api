define([
  'jquery', 
  'backbone'
], function(
  $, 
  Backbone
){

	var ProjectModel = Backbone.Model.extend({
	  url : function() {
	    return '/api/projects/' + this.id;
	  }
	});

	return ProjectModel;
});