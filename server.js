const cors = require("cors");

var corsOptions = {
	origin: 'http://localhost',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const configureServer = app => {
	app.use(cors(corsOptions));
};

module.exports = configureServer;
