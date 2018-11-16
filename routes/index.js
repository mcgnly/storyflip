const paymentApi = require("./payment");
const uploadApi = require("./upload");
const frontend = require("./frontend");

const configureRoutes = app => {
	frontend(app);
	paymentApi(app);
	uploadApi(app);
};

module.exports = configureRoutes;
