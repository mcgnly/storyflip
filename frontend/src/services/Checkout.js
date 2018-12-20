import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { withRouter } from 'react-router-dom'

import STRIPE_PUBLISHABLE from "../constants/stripe";
import PAYMENT_SERVER_URL from "../constants/server";
import UPLOAD_SERVER_URL from "../constants/upload";

const CURRENCY = "EUR";

const fromEuroToCent = amount => amount * 100;

const successPayment = (res, pdf, flushState, orderId) => {
	postUpload(orderId, pdf, flushState);
	// redirect to a success page
	flushState();
	alert("We have recieved your order! If you have any questions, please contact storyflip@mcgnly.com");
};

const stripePost = (token, amount, orderId) =>
{
	try {
		const res = axios.post(
		PAYMENT_SERVER_URL, {
			description: orderId,
			source: token.id,
			currency: CURRENCY,
			amount: fromEuroToCent(amount),
			metadata:{order_id:token.created}
		});
		return res;
	} catch (error) {
		console.error(error)
	}
}

export const postUpload = (orderId, pdf, flushState) => {
	const checkedPdf = pdf.type === "application/pdf";
	var fd = new FormData();
	fd.append("pdf", pdf);
	fd.append("order_id", orderId);
	if (checkedPdf){
		axios({
			method: "post",
			url: UPLOAD_SERVER_URL.toString(),
			data: fd,
			headers: { "content-type": "multipart/form-data" }
		}).then(
			res => {
				flushState();
				alert("Payment and upload Successful");
			},
			err => {
				console.log("err", err);
		});
	} else {
		alert('sorry, this is the wrong kind of data');
	}
};

const onToken = (amount, orderId, pdf, flushState) => token => {
	stripePost(token, amount, orderId)
		.then(
			(res) => {
				successPayment(res, pdf, flushState, orderId)
			},
			(err) => {
				alert("Payment or upload Error", err);
			}
		);
};

const locationStyle = {
	display: 'block',
	margin: '2em',
};

const Checkout = ({ name, orderId, amount, pdf, flushState }) => (
	<div style={locationStyle}>
		<StripeCheckout
			name={name}
			amount={fromEuroToCent(amount)}
			token={onToken(amount, orderId, pdf, flushState)}
			currency={CURRENCY}
			stripeKey={STRIPE_PUBLISHABLE}
			shippingAddress
			billingAddress
		/>
	</div>
);

export default Checkout;
