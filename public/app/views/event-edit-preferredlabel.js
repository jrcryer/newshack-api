define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var EventEditPreferredLabelView = Backbone.View.extend({

    template: Template['app/template/event-edit-preferredlabel.hbs'],

    el: "#editor-content",

    initialize: function (model) {
      this.model = model;
    },

    render: function () {
      var _this = this;
      var html = this.template(this.model);
      $(this.el).append(html);

      $(this.el).find('#event-preferredlabel').on('change', function(){
        _this.model.preferredLabel = _this.$el.find('#event-preferredlabel').val();
      });
      return this;
    }

  });

  return EventEditPreferredLabelView;
});