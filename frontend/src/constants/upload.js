const UPLOAD_SERVER_URL =
	process.env.NODE_ENV === "production"
		? "/save"
		: "/save";

export default UPLOAD_SERVER_URL;
