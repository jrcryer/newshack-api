define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var ProjectPreviewView = Backbone.View.extend({

    template: Template['app/template/project-preview.hbs'],

    el: "#editor-content",

    initialize: function (model) {
      this.model = model;
      this.model.host = window.newshackHost;
    },

    render: function () {
      var _this = this;
      var html = this.template(this.model);
      $(this.el).append(html);
      return this;
    }

  });

  return ProjectPreviewView;
});