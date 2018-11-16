// const frontendHTML = require('./build');
var express = require('express');
// var serveStatic = require('serve-static')


const serveFrontend = app => {
  app.use(express.static(__dirname+'/../frontend/build/'))
};

module.exports = serveFrontend;
