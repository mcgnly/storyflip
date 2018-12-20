var express = require('express');
var env = require('../instaflipServerConstants/server');

const serveFrontend = app => {
  console.log('env.PRODUCTION', env.PRODUCTION)
  env.PRODUCTION ?
  app.use(express.static(__dirname+'/../../client/build/')) :
  app.use(express.static(__dirname+'/../../client/public/'))
};

module.exports = serveFrontend;
