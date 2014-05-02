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
  'models/projects',
	'models/project',
  'models/storyline',
  'models/storylines'
], function(
	$, 
	Backbone, 
  Handlebars,
	DefaultView,
  ProjectsModel,
	ProjectModel,
  StorylineModel,
  StorylinesModel
){

  var AppRouter = Backbone.Router.extend({
    routes: {
      "projects/:id": "project",
      "*actions": "default"
    }
  });

	$(document).ready(function () {

    function listProjects() {
      var _this = this;
      var projects = new ProjectsModel();
      projects.fetch({
        success: function (model) {
          view.showProjects(projects);
        }
      });
    };

    function loadProject(id) {
      var _this = this;

      var storylines = new StorylinesModel();
      storylines.fetch({
        success: function(){
          window.storylines = storylines;
        }
      });

      var project = new ProjectModel({id: id}), storyline;

      project.fetch({
        success: function (model) {
          storyline = new StorylineModel({id: project.get('storylineId')});
          storyline.fetch({
            success: function(model) {
              window.projectModel = project;
              window.project = project.toJSON();
              window.storylineModel = storyline;
              window.storyline = storyline.toJSON();
              Backbone.trigger('project:edit', project, storyline);
              view.setProjectAndStoryline({
                project: window.project,
                storyline: window.storyline
              });
            }
          });
        }
      });
    };

    var view = new DefaultView();
		var routerInstance = new AppRouter();
    routerInstance.on('route:default', function(){
      window.projectModel = null;
      window.project = null;
      window.storylineModel = null;
      window.storyline = null;
      listProjects();
    });
    routerInstance.on('route:project', function(id){
      loadProject(id);
    });

    Backbone.on('project:load', function(){
      routerInstance.navigate("/", {trigger: true});
    });

    Backbone.on('project:select', function(project){
      routerInstance.navigate("/projects/" +project._id, {trigger: true});
    });

    Backbone.history.start({
        pushState: true,
        root: '/'
    });
	});

});

