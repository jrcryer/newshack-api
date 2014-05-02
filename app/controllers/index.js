'use strict';

exports.render = function(req, res) {
  res.render('index', {
    title: 'Storyline Tool',
    newshackHost: process.env.NODE_ENV === 'development' ? 'localhost:4000' : 'newshack.herokuapp.com'
  });
};
