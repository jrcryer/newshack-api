define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var StorylineEditTitleView = Backbone.View.extend({

    template: Template['app/template/storyline-edit-title.hbs'],

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

      $(this.el).find('#storyline-title').on('change', function(){
        _this.model.title = _this.$el.find('#storyline-title').val();
      });
      return this;
    },

    updateValue: function() {
      console.log('update value', this.$el.find('input').val());
      this.model.title = this.$el.find('input').val();
      console.log('this.model', this.model);
    }

  });

  return StorylineEditTitleView;
});