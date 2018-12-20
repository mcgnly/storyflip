var express = require('express');
var env = require('../instaflipServerConstants/server');

const serveFrontend = app => {
  console.log('env.PRODUCTION', env.PRODUCTION)
  env.PRODUCTION ?
  app.use(express.static(__dirname+'/../frontend/build/')) :
  app.use(express.static(__dirname+'/../frontend/public/'))
};

module.exports = serveFrontend;
