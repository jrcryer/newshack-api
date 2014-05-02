define([
  'jquery', 
  'backbone', 
  'template',
  'views/header',
  'views/nav-storyline',
  'views/editor'
], function(
  $, 
  Backbone, 
  Template,
  HeaderView,
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
    },

    setProject: function(model) {
      this.model = model;
      var navView = new NavStorylineView(this.model);
      navView.render();

      var editorView = new EditorView();
      editorView.render();
    }

  });

  return DefaultView;
});