define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var ProjectEditTitleView = Backbone.View.extend({

    template: Template['app/template/project-edit-title.hbs'],

    el: "#editor-content",

    initialize: function (model) {
      this.model = model;
    },

    render: function () {
      var _this = this;
      var html = this.template(this.model);
      $(this.el).append(html);

      $(this.el).find('#project-title').on('change', function(){
        var title = _this.$el.find('#project-title').val();
        _this.model.title = title;
        window.projectModel.set('title', title)
        Backbone.trigger('project:edit-title', title);
      });
      return this;
    }

  });

  return ProjectEditTitleView;
});