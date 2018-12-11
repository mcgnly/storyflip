var express = require('express');

const serveFrontend = app => {
  app.use(express.static(__dirname+'/../frontend/build/'))
};

module.exports = serveFrontend;
