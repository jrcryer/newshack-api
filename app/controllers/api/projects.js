'use strict';

var mongoose = require('mongoose'),
api = require('../api'),
Project = mongoose.model('Project');


exports.get = function(req, res) {
  var projectId = req.params.id, project;
  exports.findByQuery({_id: projectId}, null, function(projects){
    if (!projects || 0 === projects.length) {
        return res.send('No project matching id ' +projectId);
    }
    project = projects[0];
    res.json(project); 
  });
};

exports.delete = function(req, res) {
  Project.remove({_id: req.params.id }, function(err, project){
    if (err) {
      res.json({error: err}); 
    } else {
      res.json({message: 'deleted'}); 
    }
  });
};

/**
 * List resources
 */
exports.list = function(req, res) {
  return Project.find(function (err, projects) {
    if (!err) {
      return res.json(projects);
    } else {
      return res.send(err);
    }
  });
};

/**
 * Create user
 */
exports.create = function(req, res) {
  var now = new Date();
  var project = new Project({
    storylineId: req.body.storylineId,
    title: req.body.title,
    created: now,
    modified: now
  });

  exports.populateProjectFromStoryline(project, function(){
    project.save(function (err) {
      if (!err) {
        return res.json(project);
      } else {
        return res.send(err);
      }
    });    
  });

};

exports.populateProjectFromStoryline = function(projectModel, callback) {
  var storyline, storylineData = {};
  console.log('populateProjectFromStoryline', projectModel.storylineId);
  api.storylines.findByQuery({_id: projectModel.storylineId}, null, function(storylines) {
    if (storylines && storylines.length) {
      storyline = storylines[0];
      console.log('storyline', storyline.title);
      storylineData.title = storyline.title;
      storylineData.synopsis = storyline.synopsis;
      storylineData.uri = storyline.uri;
      storylineData.events = [];
      if (storyline.events) {
        storyline.events.forEach(function(event){
          storylineData.events.push({
            eventStartDate: event.eventStartDate,
            preferredLabel: event.preferredLabel
          });
        });
      }
      projectModel.storyline = storylineData;
    } else {
      console.log('Error populating project from storyline');
    }
    callback();
  });
};

/**
 * Update user
 */
exports.update = function(req, res) {
  Project.findOne({uri: req.params.uri}, function(err, project){
    if (!err) {
      project.increment();
      if (req.body.title) {
        project.title = req.body.title;
      }
      if (req.body.storyline) {
        project.storyline = req.body.storyline;
      }
      project.increment();
      project.modified = new Date();
      project.save(function (err) {
        if (!err) {
          return res.json(project);
        } else {
          return res.send(err);
        }
      });
    } else {
      return res.send(err);
    }
  });
};

/**
 * Query for storylines
 */
exports.findByQuery = function(query, sort, callback) {
  Project.find(query).sort(sort).exec(function(err, projects){
    if (!err) {
      callback(projects);
    } else {
      callback();
    }
  });
};

