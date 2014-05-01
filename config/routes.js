var async = require('async');

module.exports = function(app) {

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

    //API
	var api = require('../app/controllers/api');
  	app.get('/api/storylines', api.storylines.list);
  	app.post('/api/storylines', api.storylines.create);
  	app.get('/api/storylines/:id', api.storylines.get);
  	app.delete('/api/storylines/:id', api.storylines.delete);
  	app.put('/api/storylines/:id', api.storylines.update);

};