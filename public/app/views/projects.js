define([
  'jquery', 
  'backbone', 
  'template'
], function(
  $, 
  Backbone, 
  Template
){

  var NewProjectView = Backbone.View.extend({

    template: Template['app/template/project-new.hbs'],

    el: "#new-project",

    events: {
      'submit form': 'onSubmit'
    },

    initialize: function (model) {
      this.model = model;
    },

    render: function () {
      var html = this.template({storylines: window.storylines});
      $(this.el).append(html);
      return this;
    },

    onSubmit: function (event) {
      event.preventDefault();
      var title = $(this.el).find('#project-name').val();
      var storylineId = $(this.el).find('#project-storyline').val();
      if (title.length > 0) {
        $.ajax({
          url: '/api/projects',
          type: 'POST',
          dataType: 'json', 
          data: {title: title, storylineId: storylineId},
          success: function(response) {
            if (response && response._id) {
              Backbone.trigger('project:created', response._id);
            }
          } 
        })
      }
    }

  });

  var ProjectView = Backbone.View.extend({

    template: Template['app/template/project.hbs'],

    tagName: "li",

    events: {
      'click': 'onClick'
    },

    initialize: function (model) {
      this.model = model;
    },

    render: function () {
      var html = this.template(this.model);
      $(this.el).append(html);
      return this;
    },

    onClick: function () {
      Backbone.trigger('project:select', this.model);
    }

  });

  var ProjectsView = Backbone.View.extend({

    template: Template['app/template/projects.hbs'],

    el: "#editor-content",

    initialize: function (model) {
      this.model = model;
    },

    render: function () {
      var html;
      $('#nav-storyline').html('');

      html = this.template(this.model.storyline);
      $(this.el).html(html);

      var newProjectView = new NewProjectView();
      newProjectView.render();

      var index, html = $('<ul class="projects"/>'), projectView;
      for (index in this.model.attributes) {
        projectView = new ProjectView(this.model.attributes[index]);
        html.append(projectView.render().el);
      };
      this.$el.find('#projects').append(html);
    }

  });

  return ProjectsView;

});