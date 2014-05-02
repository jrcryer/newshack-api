define([
  'jquery', 
  'backbone', 
  'template',
  'views/storyline-summary',
  'views/storyline-edit-title',
  'views/storyline-edit-synopsis',
  'views/event-summary',
  'views/event-edit-preferredlabel'
], function(
  $, 
  Backbone, 
  Template,
  StorylineSummaryView,
  StorylineEditTitleView,
  StorylineEditSynopsisView,
  EventSummaryView,
  EventEditPreferredLabelView
){

  var EditorView = Backbone.View.extend({

    template: Template['app/template/editor.hbs'],

    el: '#editor',

    getProjectStoryline: function() {
      return window.project.storyline;
    },

    getProjectEvent: function(id) {
      var matchedEvent;
      window.project.storyline.events.forEach(function(event){
        if (id === event.id) {
          matchedEvent = event;
        }
      });
      return matchedEvent;
    },

    getExpandedStoryline: function() {
      return window.storyline;
    },

    getExpandedEvent: function(id) {
      var matchedEvent;
      window.storyline.events.forEach(function(event){
        if (id === event.id) {
          matchedEvent = event;
        }
      });
      return matchedEvent;
    },

    initialize: function () {
      var _this = this;
      Backbone.on('storyline:select', function(storyline){
        _this.showStoryline(
          _this.getProjectStoryline(),
          _this.getExpandedStoryline()
        );
      });
      Backbone.on('event:select', function(event){
        _this.showEvent(
          _this.getProjectEvent(event.id),
          _this.getExpandedEvent(event.id)
        );
      });
    },

    render: function () {
      var html = this.template(this.model);
      $(this.el).append(html);
      return this;
    },

    showStoryline: function(projectStoryline, expandedStoryline) {
      var view;
      this.$el.find('#editor-content').html(
        '<h2>Edit Storyline: ' +expandedStoryline.title +'</h2>'
      );
      view = new StorylineEditTitleView(projectStoryline);
      view.render();
      view = new StorylineEditSynopsisView(projectStoryline);
      view.render();
    },

    showEvent: function(projectEvent, expandedEvent) {
      var view;
      this.$el.find('#editor-content').html(
        '<h2>Edit Event: ' +expandedEvent.preferredLabel +'</h2>'
      );
      view = new EventEditPreferredLabelView(projectEvent);
      view.render();
    }

  });

  return EditorView;
});