define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var StorylineEditNewsItemView = Backbone.View.extend({

    template: Template['app/template/storyline-edit-newsitem.hbs'],

    tagName: 'li',

    initialize: function (model) {
      this.model = model;
    },

    addNewsItemToStoryline: function(){
      var identifier = this.model.newsItem.identifier;
      var isInArray = false;
      this.model.projectStoryline.newsItems.forEach(function(newsItem){
        if (newsItem.identifier === identifier) {
          isInArray = true;
        }
      });
      if (!isInArray) {
        this.model.projectStoryline.newsItems.push(this.model.newsItem);
      }
    },

    removeNewsItemFromStoryline: function(){
      var identifier = this.model.newsItem.identifier;
      var isInArray = false, matchedIndex;
      this.model.projectStoryline.newsItems.forEach(function(newsItem, index){
        if (newsItem.identifier === identifier) {
          isInArray = true;
          matchedIndex = index;
        }
      });
      if (isInArray) {
        this.model.projectStoryline.newsItems = this.model.projectStoryline.newsItems.slice(matchedIndex, matchedIndex);
      }
    },

    render: function () {
      var _this = this;
      var html = this.template(this.model.newsItem);
      $(this.el).append(html);
      $(this.el).find('input').on('change', function(){
        var value = _this.$el.find('input').is(':checked');
        if (value) {
          _this.addNewsItemToStoryline();
        } else {
          _this.removeNewsItemFromStoryline();
        }
      });
      return this;
    }

  });

  var StorylineEditNewsItemsView = Backbone.View.extend({

    template: Template['app/template/storyline-edit-newsitems.hbs'],

    el: "#editor-content",

    initialize: function (model) {
      this.model = model;
      if (!this.model.projectStoryline.newsItems) {
        this.model.projectStoryline.newsItems = [];
      }
    },

    getProjectNewsItem: function(identifier) {
      var matchedNewsItem;
      this.model.projectStoryline.events.forEach(function(event){
        if (event.newsItems) {
          event.newsItems.forEach(function(newsItem){
            if (identifier === newsItem.identifier) {
              matchedNewsItem = newsItem;
            }
          });
        }
      });
      return matchedNewsItem;
    },

    render: function () {
      var _this = this;
      var html = this.template(this.model);
      $(this.el).append(html);

      html = $('<ul class="newsItems"/>');
      var newsItemView;
      this.model.expandedStoryline.events.forEach(function(event){
        event.newsItems.forEach(function(newsItem){
          if (_this.getProjectNewsItem(newsItem.identifier)){
            newsItem.isKey = true;
          } else {
            newsItem.isKey = false;
          };
          newsItemView = new StorylineEditNewsItemView({
            projectStoryline: _this.model.projectStoryline,
            newsItem: newsItem
          });
          html.append(newsItemView.render().el);
        });
      });
      this.$el.find('#storyline-edit-newsitems h2').after(html);

      return this;
    }

  });

  return StorylineEditNewsItemsView;
});