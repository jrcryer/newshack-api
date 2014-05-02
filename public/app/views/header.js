define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var HeaderView = Backbone.View.extend({

    template: Template['app/template/header.hbs'],

    el: "header",

    events: {
      'click .save': 'saveProject'
    },

    initialize: function (model) {
      this.model = model;
    },

    render: function () {
      var html = this.template();
      $(this.el).append(html);
    },

    saveProject: function () {
      var storyline = window.project.get('storyline');
      storyline.title = 'Saved storyline';
      window.project.set('storyline', storyline);
      window.project.set('title', 'Saved project');
      window.project.save();
    }

  });

  return HeaderView;

});