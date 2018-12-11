import React from "react";
import ScriptLoader from "react-script-loader-hoc";
import Checkout from "../../services/Checkout";
import "./OrderForm.css";
import { Link } from "react-router-dom";

const OrderForm = ({madeBy, pdf}) => (
  <div>
    <h1>ORDER YOUR FLIPBOOK</h1>
    <p className="aboutText">
      If you would prefer to buy a professionally printed flipbook
      rather than print your own, we offer this service for 20EUR including
      shipping.
    </p>
    <Checkout
      name={"Storyflip"}
      description={`Storyflip book for: ${madeBy}`}
      amount={20}
      pdf={pdf}
    />
    <Link to="/">Go Back to Main Page</Link>
  </div>
);
export default ScriptLoader("https://js.stripe.com/v3/")(OrderForm);
