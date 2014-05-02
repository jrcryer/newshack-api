define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var EventEditThumbnailView = Backbone.View.extend({

    template: Template['app/template/event-edit-thumbnail.hbs'],

    el: "#editor-content",

    initialize: function (model) {
      this.model = model;
    },

    render: function () {
      var _this = this;
      var html = this.template(this.model);
      $(this.el).append(html);

      $(this.el).find('#event-thumbnail').on('change', function(){
        _this.model.thumbnail = _this.$el.find('#event-thumbnail').val();
      });
      return this;
    }

  });

  return EventEditThumbnailView;
});