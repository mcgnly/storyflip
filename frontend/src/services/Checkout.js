import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import STRIPE_PUBLISHABLE from "../constants/stripe";
import PAYMENT_SERVER_URL from "../constants/server";
import UPLOAD_SERVER_URL from "../constants/upload";

const CURRENCY = "EUR";

const fromEuroToCent = amount => amount * 100;

const successPayment = data => {
	// redirect to a success page
	alert("Payment and upload Successful");
	// updateView("main");
};

const errorPayment = data => {
	alert("Payment or upload Error", data);
};

const stripePost = (token, amount, orderId) =>
{
	console.log('token, amount, orderId', token, amount, orderId);
	return (axios.post(PAYMENT_SERVER_URL, {
		description: orderId,
		source: token.id,
		currency: CURRENCY,
		amount: fromEuroToCent(amount),
		metadata:{order_id:token.created}
	})
	);
}

export const postUpload = (orderId, pdf) => {
	// const checkedPdf = pdf.type === "application/pdf";

	var fd = new FormData();
	fd.append("pdf", pdf);
	fd.append("order_id", orderId);
	console.log("what does my form data look like?", fd);
	axios({
		method: "post",
		url: UPLOAD_SERVER_URL.toString(),
		data: fd,
		headers: { "content-type": "multipart/form-data" }
	}).then(
		res => {
			console.log("res", res);
		},
		err => {
			console.log("err", err);
		}
	);
};

const onToken = (amount, orderId) => token => {
	Promise(stripePost(token, amount, orderId))
		.then(successPayment)
		.catch(errorPayment);
};

const locationStyle = {
	display: 'block',
	margin: '2em',
};

const Checkout = ({ name, orderId, amount }) => (
	<div style={locationStyle}>
		<StripeCheckout
			name={name}
			description={orderId}
			amount={fromEuroToCent(amount)}
			token={onToken(amount, orderId)}
			currency={CURRENCY}
			stripeKey={STRIPE_PUBLISHABLE}
			shippingAddress
			billingAddress
		/>
	</div>
);

export default Checkout;
