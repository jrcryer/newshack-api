App.views.CreativeWork = Backbone.View.extend({

  template: _.template($("#creative-work-template").html()),
  el: ".creative-works",

  initialize: function (model) {
    this.model = model;

    this.render();
  },

  render: function () {
    var html = this.template(this.model);
    $(this.el).append(html);
  }
});