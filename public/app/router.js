App.Router = Backbone.Router.extend({
  routes: {
    "project": "project",
    "storylines": "storylines",
    "*actions": "default"
  },

  project: function () {
    this.view = new App.views.Project();
  },

  storylines: function () {
    this.view = new App.views.Storylines();
  },

  default: function () {
    this.view = new App.views.Default();

    this.loadProject('123');
  },

  loadProject: function(id) {
    var _this = this;
    // jQuery get project by projectID

    var project = new App.models.Project({id: id});

    project.fetch({
      success: function (model) {
        _this.view.setProject(model);
      }
    });
  }
});

$(document).ready(function () {
  App.routerInstance = new App.Router;
  Backbone.history.start();
});
