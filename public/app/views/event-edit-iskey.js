define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var EventEditIsKeyView = Backbone.View.extend({

    template: Template['app/template/event-edit-iskey.hbs'],

    el: "#editor-content",

    initialize: function (model) {
      this.model = model;
    },

    render: function () {
      var _this = this;
      var html = this.template(this.model);
      $(this.el).append(html);

      $(this.el).find('#event-iskey').on('change', function(){
        var value = _this.$el.find('#event-iskey').is(':checked');
        console.log('value', value);
        _this.model.isKey = value;
      });
      return this;
    }

  });

  return EventEditIsKeyView;
});