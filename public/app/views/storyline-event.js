App.views.StorylineEvent = Backbone.View.extend({

  template: _.template($("#storyline-event-template").html()),
  el: "#storyline-events",

  initialize: function (model) {
    this.model = model;

    this.render();


    this.model.get('creativeWorks').forEach(function (item) {
      new App.views.CreativeWork(new App.models.CreativeWork(item));
    });
  },

  render: function () {
    var html = this.template(this.model);
    $(this.el).append(html);
  }
});