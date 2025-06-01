// pages/api/checkout_sessions.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "QuickDocGen PRO Access",
              },
              unit_amount: 500, // $5.00
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      });
      res.status(200).json({ url: session.url });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
