var express = require('express');
var env = require('../constants/server');

const serveFrontend = app => {
  env.PRODUCTION ?
  app.use(express.static(__dirname+'/../../client/build/')) :
  app.use(express.static(__dirname+'/../../client/public/'))
};

module.exports = serveFrontend;
