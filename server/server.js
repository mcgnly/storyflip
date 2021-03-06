const cors = require("cors");
var winston = require('./config/winston');
var morgan = require('morgan');



var corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const configureServer = app => {
	app.use(cors(corsOptions));
	app.use(morgan('[:date[web]] :method :url :status :referrer', { stream: winston.stream }));

};

module.exports = configureServer;
