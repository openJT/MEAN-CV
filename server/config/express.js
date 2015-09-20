/**
 * Express configuration
 */
'use strict';
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var favicon = require('serve-favicon');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

module.exports = function (app) {
    var env = app.get('env');
    app.set('views', __dirname + '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(favicon('apps/favicon.ico'));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(methodOverride());
    app.use(cookieParser());
    //Persist sessions with mongoStore
    app.use(session({
        cookie : {
            maxAge: 3600
        },
        secret: config.secrets.session,
        saveUninitialized: true,
        resave: true,
        store: new mongoStore({
            url: config.mongo.uri,
            collection: 'sessions'
        }, function(){
            console.log('db connection open');
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    if ('production' === env) {
        app.use(express.static(path.join(config.root, 'apps')));
        app.use(express.static(path.join(config.root, 'assets')));
        app.set('appPath', 'apps');
    }

    if ('development' === env || 'test' === env) {
        app.use(express.static(path.join(config.root, 'apps')));
        app.use(express.static(path.join(config.root, 'assets')));
        app.set('appPath', 'apps');
        app.use(morgan('dev'));
        app.use(errorHandler());
    }
};
