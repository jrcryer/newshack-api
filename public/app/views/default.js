define([
  'jquery', 
  'backbone', 
  'template',
  'views/header',
  'views/projects',
  'views/nav-storyline',
  'views/editor'
], function(
  $, 
  Backbone, 
  Template,
  HeaderView,
  ProjectsView, 
  NavStorylineView,
  EditorView
){

  var DefaultView = Backbone.View.extend({

    template: Template['app/template/default.hbs'],

    el: "body",

    initialize: function () {
      this.render();
    },

    render: function () {
      var html = this.template(this.model);
      $(this.el).append(html);

      var view = new HeaderView();
      view.render();

      var editorView = new EditorView();
      editorView.render();
    },

    showProjects: function(model) {
      var view = new ProjectsView(model);
      view.render();
    },

    setProjectAndStoryline: function(data) {
      var navView = new NavStorylineView({
        storyline: data.storyline
      });
      navView.render();
      navView.$el.find('li.storyline').trigger('click');
    }

  });

  return DefaultView;
});