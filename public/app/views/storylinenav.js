define([
  'jquery', 
  'backbone', 
  'template',
  'views/event', 
  'models/project'
], function(
  $, 
  Backbone, 
  Template,
  EventView
){

  var StorylineNavView = Backbone.View.extend({

    template: Template['app/template/nav-storyline.hbs'],

    el: "#storyline-nav",

    initialize: function (model) {
      this.model = model;
      this.render();
    },

    render: function () {

      var html = this.template(this.model.toJSON().storyline);
      $(this.el).append(html);
/*
      var creativeWorks = ('creativeWorks');
      var html = $('<ul class="events"/>'), eventView;
      this.model.get('storyline').events.forEach(function(event){
        //creativeWork.dateCreatedString = moment(creativeWork.dateCreated).format('MMMM Do YYYY');
        //creativeWorkModel = new EventModel(creativeWork);
        eventView = new EventView({model: event});
        html.append(eventView.render().el);
      });
      this.$el.find('li.storyline').after(html);
*/
    }

  });

  return StorylineNavView;

});