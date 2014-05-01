App.models.Project = Backbone.Model.extend({
  url : function() {
    //return this.id ? '/donuts/' + this.id : '/donuts';
    return "/api/sample.json";
  }

});
