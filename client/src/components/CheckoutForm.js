
import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

export default function CheckoutForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ask backend for a PaymentIntent
    const { data } = await axios.post("http://localhost:5000/api/payment/create-payment-intent", {
      amount,
    });

    const clientSecret = data.clientSecret;

    // Confirm the card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      alert("Payment Successful ✅");
      onSuccess(result.paymentIntent.id); // send id back to BookShow
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay Rs.{amount / 100}
      </button>
    </form>
  );
}
