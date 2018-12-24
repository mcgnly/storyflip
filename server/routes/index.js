const paymentApi = require("./payment");
const uploadApi = require("./upload");
const downloadApi = require("./download");
const frontend = require("./frontend");

const configureRoutes = app => {
	frontend(app);
	paymentApi(app);
	uploadApi(app);
	downloadApi(app);
};

module.exports = configureRoutes;
