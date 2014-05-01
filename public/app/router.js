
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
  }
});

$(document).ready(function () {
  App.routerInstance = new App.Router;
  Backbone.history.start();
});
