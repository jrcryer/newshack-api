define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var StorylineSummaryView = Backbone.View.extend({

    template: Template['app/template/storyline-summary.hbs'],

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

  return StorylineSummaryView;
});