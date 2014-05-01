App.views.Default = Backbone.View.extend({

  template: _.template($("#default-template").html()),
  el: "body",

  initialize: function () {
    this.render();
  },

  render: function () {
    var html = this.template(this.model);
    $(this.el).append(html);
  },

  setProject: function(model) {
    this.model = model;

    new App.views.StorylineNav(this.model);
  }

});