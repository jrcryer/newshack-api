define([
  'jquery', 
  'backbone', 
  'template',
  'views/nav-storyline',
  'views/editor'
], function(
  $, 
  Backbone, 
  Template,
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