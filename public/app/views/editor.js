define([
  'jquery', 
  'backbone', 
  'template',
  'views/storyline-summary',
  'views/event-summary'
], function(
  $, 
  Backbone, 
  Template,
  StorylineSummaryView,
  EventSummaryView
){

  var EditorView = Backbone.View.extend({

    template: Template['app/template/editor.hbs'],

    el: '#editor',

    initialize: function () {
      var _this = this;
      Backbone.on('storyline:select', function(storyline){
        console.log('select storyline', storyline);
        _this.showStoryline(storyline);
      });
      Backbone.on('event:select', function(event){
        console.log('select event', event);
        _this.showEvent(event);
      });
    },

    render: function () {
      var html = this.template(this.model);
      $(this.el).append(html);
      return this;
    },

    showStoryline: function(storyline) {
      this.$el.find('#editor-content').html('');
      var view = new StorylineSummaryView(storyline);
      view.render();
    },

    showEvent: function(event) {
      this.$el.find('#editor-content').html('');
      var view = new EventSummaryView(event);
      view.render();
    }

  });

  return EditorView;
});