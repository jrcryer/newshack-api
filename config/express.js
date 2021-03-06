/**
 * Module dependencies.
 */
var express        = require('express'),
    consolidate    = require('consolidate'),
    session        = require('express-session'),
    morgan         = require('morgan'),
    cookieParser   = require('cookie-parser'),
    serveStatic    = require('serve-static'),
    bodyParser     = require('body-parser'),
    compression    = require('compression'),
    methodOverride = require('method-override'),
    flash          = require('connect-flash'),
    config         = require('./config');

module.exports = function(app, db) {
    app.set('showStackError', true);

    //Should be placed before express
    app.use(compression({
        filter: function(req, res) {
            return (/json|text/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    //Don't use logger for test env
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    // Enable jsonp
    app.enable('jsonp callback');

    // The cookieParser should be above session
    app.use(cookieParser());

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Connect flash for flash messages
    app.use(flash());

    // Setting the fav icon and static folder
    app.use(serveStatic(config.root + '/public'));

    // Assume "not found" in the error msgs is a 404. this is somewhat
    // silly, but valid, you can do whatever you like, set properties,
    // use instanceof etc.
    app.use(function(err, req, res, next) {
        // Treat as 404
        if (~err.message.indexOf('not found')) return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });
};
