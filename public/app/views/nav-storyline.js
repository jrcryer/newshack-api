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

    el: "#nav-storyline",

    events: {
      'click .storyline': 'onClick'
    },

    initialize: function (model) {
      this.model = model.storyline;
    },

    render: function () {

      var html = this.template(this.model);
      $(this.el).append(html);

      var html = $('<ul class="events"/>'), eventView;
      this.model.events.forEach(function(event){
        eventView = new NavEventView(event);
        html.append(eventView.render().el);
      });
      this.$el.find('li.storyline').after(html);

    },

    onClick: function () {
      Backbone.trigger('storyline:select', this.model);
      //this.$el.find('.properties').addClass('active');
    }

  });

  return NavStorylineView;

});