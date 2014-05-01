define([
  'jquery', 
  'backbone', 
  'template',
  'views/default', 
  'models/project'
], function(
  $, 
  Backbone, 
  Template,
  DefaultView, 
  ProjectModel
){

  var StorylineNavEventView = Backbone.View.extend({

    template: Template['app/template/nav-event.hbs'],

    el: "#storyline-events",

    initialize: function (model) {
      this.model = model;

      this.render();


      this.model.get('creativeWorks').forEach(function (item) {
        new App.views.CreativeWork(new App.models.CreativeWork(item));
      });
    },

    render: function () {
      var html = this.template(this.model);
      $(this.el).append(html);
    }
  });

  return StorylineNavEventView;
});