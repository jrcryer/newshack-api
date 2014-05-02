define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var StorylineEditThumbnailView = Backbone.View.extend({

    template: Template['app/template/storyline-edit-thumbnail.hbs'],

    el: "#editor-content",

    initialize: function (model) {
      this.model = model;
    },

    render: function () {
      var _this = this;
      var html = this.template(this.model);
      $(this.el).append(html);

      $(this.el).find('#storyline-thumbnail').on('change', function(){
        _this.model.thumbnail = _this.$el.find('#storyline-thumbnail').val();
      });
      return this;
    }

  });

  return StorylineEditThumbnailView;
});