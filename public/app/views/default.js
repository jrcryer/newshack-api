define([
  'jquery', 
  'backbone', 
  'template',
  'views/storylinenav'
], function(
  $, 
  Backbone, 
  Template,
  StorylineNavView
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
      var navView = new StorylineNavView(this.model);
    }

  });

  return DefaultView;
});