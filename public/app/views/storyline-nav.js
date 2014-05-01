App.views.StorylineNav = Backbone.View.extend({

  template: _.template($("#storyline-nav-template").html()),
  el: "#storyline-nav",

  initialize: function (model) {
    this.model = model;

    this.render();

    this.model.get('storyline').events.forEach(function (item) {
      new App.views.StorylineEvent(new App.models.StorylineEvent(item));
    });

  },

  render: function () {
    var html = this.template(this.model);
    $(this.el).append(html);
  }

});