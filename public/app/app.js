var App = {
  models: {},
  views: {}
};


require.config({
  paths: {
    'app': '/app',
  	'jquery': '/components/jquery/dist/jquery.min',
  	'underscore': '/components/underscore/underscore',
  	'backbone': '/components/backbone/backbone',
    'handlebars': '/components/handlebars/handlebars'
  },
  shim: {
    handlebars: {
      exports: 'Handlebars'
    }
  }
});

define([
	'jquery', 
	'backbone',
  'handlebars', 
	'views/default', 
	'models/project'
], function(
	$, 
	Backbone, 
  Handlebars,
	DefaultView, 
	ProjectModel
){

  var AppRouter = Backbone.Router.extend({
    routes: {
      "projects/:id": "project",
      "storylines": "storylines",
      "*actions": "default"
    }
  });

	$(document).ready(function () {

    function loadProject(id) {
      var _this = this;
      // jQuery get project by projectID

      var project = new ProjectModel({id: id});

      project.fetch({
        success: function (model) {
          view.setProject(model);
        }
      });
    };

    var view = new DefaultView();
		var routerInstance = new AppRouter();
    routerInstance.on('route:project', function(id){
      loadProject(id);
    });

    Backbone.history.start({
        pushState: true,
        root: '/'
    });
	});

});

