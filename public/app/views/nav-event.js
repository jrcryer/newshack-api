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

  var NavEventView = Backbone.View.extend({

    template: Template['app/template/nav-event.hbs'],

    tagName: 'li',

    events: {
      'click': 'onClick'
    },

    initialize: function (model) {
      this.model = model;
    },

    render: function () {
      var html = this.template(this.model);
      $(this.el).append(html);
      return this;
    },

    onClick: function () {
      Backbone.trigger('event:select', this.model);
    }
  });

  return NavEventView;
});