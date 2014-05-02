define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var EventSummaryView = Backbone.View.extend({

    template: Template['app/template/event-summary.hbs'],

    el: "#editor-content",

    initialize: function (model) {
      this.model = model;
    },

    render: function () {
      var html = this.template(this.model);
      $(this.el).append(html);
      return this;
    }

  });

  return EventSummaryView;
});