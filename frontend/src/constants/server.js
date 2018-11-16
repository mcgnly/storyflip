const PAYMENT_SERVER_URL =
	process.env.NODE_ENV === "production"
		? "http://localhost:8080/pay"
		: "http://localhost:8080/pay";

export default PAYMENT_SERVER_URL;
