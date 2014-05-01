App.views.Default = Backbone.View.extend({

  template: _.template($("#default-template").html()),
  el: "body",

  initialize: function () {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function () {
    var html = this.template({});
    $(this.el).append(html);
  }
});