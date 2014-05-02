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

    function loadStorylines(callback) {
      var storylines = new StorylinesModel();
      storylines.fetch({
        success: function(model){
          var data = [];
          for (var index in storylines.attributes){
            data.push(storylines.attributes[index]);
          }
          window.storylines = data;
          callback();
        }
      });        
    }

    function loadProject(id) {
      var _this = this;

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
              Backbone.trigger('project:loaded', project, storyline);
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
      if (!window.storylines) {
        loadStorylines(function(){
          listProjects();
        });
      } else {
        listProjects();
      }
      
    });
    routerInstance.on('route:project', function(id){
      loadProject(id);
    });

    Backbone.on('project:created', function(id){
      routerInstance.navigate("/projects/" +id, {trigger: true});
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

