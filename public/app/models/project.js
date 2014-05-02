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
	  },
	  toJSON: function(){
	  	return {
	  		id: this.get('_id'),
	  		title: this.get('title'),
	  		storyline: this.get('storyline')
	  	}
	  }
	});

	return ProjectModel;
});