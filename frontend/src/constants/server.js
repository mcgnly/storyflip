const PAYMENT_SERVER_URL =
	process.env.NODE_ENV === "production"
		? "/pay"
		: "/pay";

export default PAYMENT_SERVER_URL;
