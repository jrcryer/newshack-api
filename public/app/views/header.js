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
      'click .title': 'editProject',
      'click .preview': 'previewProject',
      'click .load': 'loadProject',
      'click .save': 'saveProject'
    },

    initialize: function (model) {
      var _this = this;
      this.model = model;

      Backbone.on('project:save-start', function(){
        $(_this.el).find('.save').addClass('saving').text('Saving');
      });
      Backbone.on('project:save-end', function(){
        $(_this.el).find('.save').removeClass('saving').addClass('success').text('Saved');
        setTimeout(function(){
          $(_this.el).find('.save').removeClass('success').text('Save Project');
        }, 3000);
      });
      Backbone.on('project:save-error', function(){
        $(_this.el).find('.save').addClass('error').text('Error');
      });

      Backbone.on('project:loaded', function(project, storyline){
        $(_this.el).find('.title').html('<span class="logo">Storyline Editor</span> <span class="text">Project: ' +project.get('title') +'</span>');
      });
      Backbone.on('project:edit-title', function(title){
        $(_this.el).find('.title').html('Project: ' +title);
      });
      Backbone.on('project:load', function(project, storyline){
        $(_this.el).find('.title').html('<span class="logo">Storyline Editor</span>');
      });
    },

    render: function () {
      var html = this.template();
      $(this.el).append(html);
    },

    editProject: function () {
      Backbone.trigger('project:edit', window.project._id);
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
        Backbone.trigger('project:save-start');
        window.projectModel.save(null, {
          success: function(){
            Backbone.trigger('project:save-end');
          },
          error: function(){
            Backbone.trigger('project:save-error');
          }
        });
      }
    }

  });

  return HeaderView;

});