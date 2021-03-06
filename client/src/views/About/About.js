import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

export default ({ changePage }) => (
	<div>
		<h1>ABOUT</h1>
		<p className="aboutText">
			About the professional printing service: 
			For obvious reasons, nothing illegal, no porn, the usual. If it looks shady to the professional printers, they won't print it.
			For the print-yourself version, this all works on the browser so you're the only one who sees that. 

			This project was done for fun by Katie McGinley, and was thought up
			over ramen as "the most hipster thing we could think of". If you
			would like to get in touch, please email{" "}
			<a href="mailto:storyflip@mcgnly.com">storyflip@mcgnly.com</a>, or
			visit <a href="http://www.mcgnly.com">mcgnly.com</a> to read about some of the
			other projects I have done.
		</p>
		<p>
			If you have questions about how we use or store your data (we don't, and we
			use <a href="https://stripe.com/de/privacy">Stripe</a> for payment so we never put personal-identifying info 
			on our servers), please just get in touch.
		</p>
		<Link to="/">Go Back to Main Page</Link>
	</div>
);

// <mcgnly />;
