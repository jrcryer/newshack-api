define([
  'jquery', 
  'backbone', 
  'template',
  'views/nav-event', 
  'models/project'
], function(
  $, 
  Backbone, 
  Template,
  NavEventView,
  ProjectModel
){

  var NavStorylineView = Backbone.View.extend({

    template: Template['app/template/nav-storyline.hbs'],

    el: "#storyline-nav",

    events: {
      'click .storyline': 'onClick'
    },

    initialize: function (model) {
      this.model = model;
    },

    render: function () {

      var html = this.template(this.model.toJSON().storyline);
      $(this.el).append(html);

      var html = $('<ul class="events"/>'), eventView;
      this.model.get('storyline').events.forEach(function(event){
        eventView = new NavEventView(event);
        html.append(eventView.render().el);
      });
      this.$el.find('li.storyline').after(html);

    },

    onClick: function () {
      Backbone.trigger('storyline:select', this.model.toJSON());
    }

  });

  return NavStorylineView;

});