define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var EventEditSynopsisView = Backbone.View.extend({

    template: Template['app/template/event-edit-synopsis.hbs'],

    el: "#editor-content",

    initialize: function (model) {
      this.model = model;
    },

    render: function () {
      var _this = this;
      var html = this.template(this.model);
      $(this.el).append(html);

      $(this.el).find('#event-synopsis').on('change', function(){
        _this.model.synopsis = _this.$el.find('#event-synopsis').val();
      });
      return this;
    }

  });

  return EventEditSynopsisView;
});