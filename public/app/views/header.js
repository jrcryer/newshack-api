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
      'click .preview': 'previewProject',
      'click .load': 'loadProject',
      'click .save': 'saveProject'
    },

    initialize: function (model) {
      var _this = this;
      this.model = model;

      Backbone.on('project:edit', function(project, storyline){
        $(_this.el).find('.title').html('Edit Project: ' +project.get('title'));
      });
      Backbone.on('project:load', function(project, storyline){
        $(_this.el).find('.title').html('Storyline Editor');
      });
    },

    render: function () {
      var html = this.template();
      $(this.el).append(html);
    },

    previewProject: function () {
      Backbone.trigger('project:preview', window.project._id);
    },

    loadProject: function () {
      Backbone.trigger('project:load');
    },

    saveProject: function () {
      if (window.projectModel) {
        window.projectModel.set('storyline', window.project.storyline);
        window.projectModel.save();
      }
    }

  });

  return HeaderView;

});