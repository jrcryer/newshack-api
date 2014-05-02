define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var StorylineEditSynopsisView = Backbone.View.extend({

    template: Template['app/template/storyline-edit-synopsis.hbs'],

    el: "#editor-content",

    /*events: {
      'change input': 'updateValue'
    },*/

    initialize: function (model) {
      this.model = model;
    },

    render: function () {
      var _this = this;
      var html = this.template(this.model);
      $(this.el).append(html);

      $(this.el).find('#storyline-synopsis').on('change', function(){
        _this.model.synopsis = _this.$el.find('#storyline-synopsis').val();
      });
      return this;
    },

    updateValue: function() {
      this.model.title = this.$el.find('input').val();
    }

  });

  return StorylineEditSynopsisView;
});