const STRIPE_PUBLISHABLE =
	process.env.NODE_ENV === "production"
		? "pk_test_prTMzLWcUklvZkbbGPOOILud"
		: "pk_test_prTMzLWcUklvZkbbGPOOILud";

export default STRIPE_PUBLISHABLE;
