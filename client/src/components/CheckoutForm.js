// import React from "react";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { message } from "antd";

// export default function CheckoutForm({ amount, onSuccess }) {
//   // `amount` must be in the smallest currency unit (cents)
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     try {
//       // 1) Ask backend for a PaymentIntent client_secret
//       const base = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
//       const { data } = await axios.post(`${base}/api/payment/create-payment-intent`, {
//         amount, // already cents
//       });

//       const clientSecret = data.clientSecret;

//       // 2) Confirm card payment on the client
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card: elements.getElement(CardElement) },
//       });

//       if (result.error) {
//         message.error(result.error.message || "Payment failed");
//       } else if (result.paymentIntent?.status === "succeeded") {
//         message.success("Payment successful");
//         onSuccess?.(result.paymentIntent.id);
//       }
//     } catch (err) {
//       message.error(err.response?.data?.error || err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: "0 auto" }}>
//       <div style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 12 }}>
//         <CardElement options={{ hidePostalCode: true }} />
//       </div>
//       <button
//         type="submit"
//         disabled={!stripe}
//         className="ant-btn ant-btn-primary ant-btn-round ant-btn-lg"
//         style={{ width: "100%" }}
//       >
//         Pay ${(amount / 100).toFixed(2)}
//       </button>
//     </form>
//   );
// }

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
