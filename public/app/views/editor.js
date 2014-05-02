define([
  'jquery', 
  'backbone', 
  'template',
  'views/project-preview',
  'views/project-edit-title',
  'views/storyline-summary',
  'views/storyline-edit-title',
  'views/storyline-edit-synopsis',
  'views/storyline-edit-thumbnail',
  'views/storyline-edit-newsitems',
  'views/event-summary',
  'views/event-edit-iskey',
  'views/event-edit-thumbnail',
  'views/event-edit-preferredlabel',
  'views/event-edit-synopsis',
  'views/event-edit-newsitems',
], function(
  $, 
  Backbone, 
  Template,
  ProjectPreviewView,
  ProjectEditTitleView,
  StorylineSummaryView,
  StorylineEditTitleView,
  StorylineEditSynopsisView,
  StorylineEditThumbnailView,
  StorylineEditNewsItemsView,
  EventSummaryView,
  EventEditIsKeyView,
  EventEditThumbnailView,
  EventEditPreferredLabelView,
  EventEditSynopsisView,
  EventEditNewsItemsView
){

  var EditorView = Backbone.View.extend({

    template: Template['app/template/editor.hbs'],

    el: '#editor',

    getProject: function() {
      return window.project;
    },

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
      Backbone.on('project:edit', function(project){
        _this.showProject(
          _this.getProject()
        );
      });
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
      Backbone.on('project:preview', function(id){
        _this.showPreview(id);
      });
    },

    render: function () {
      var html = this.template(this.model);
      $(this.el).append(html);
      return this;
    },

    showPreview: function(projectId) {
      var view;
      this.$el.find('#editor-content').html('');
      view = new ProjectPreviewView(window.project);
      view.render();
    },

    showProject: function(project) {
      var view;
      this.$el.find('#editor-content').html('');
      view = new ProjectEditTitleView(project);
      view.render();
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
      view = new StorylineEditThumbnailView(projectStoryline);
      view.render();
      view = new StorylineEditNewsItemsView({
        projectStoryline: projectStoryline,
        expandedStoryline: expandedStoryline
      });
      view.render();
      
    },

    showEvent: function(projectEvent, expandedEvent) {
      var view;
      this.$el.find('#editor-content').html(
        '<h2>Edit Event: ' +expandedEvent.preferredLabel +'</h2>'
      );
      view = new EventEditIsKeyView(projectEvent);
      view.render();
      view = new EventEditPreferredLabelView(projectEvent);
      view.render();
      view = new EventEditSynopsisView(projectEvent, expandedEvent);
      view.render();
      view = new EventEditThumbnailView(projectEvent);
      view.render();
      view = new EventEditNewsItemsView({
        projectEvent: projectEvent,
        expandedEvent: expandedEvent
      });
      view.render();
    }

  });

  return EditorView;
});