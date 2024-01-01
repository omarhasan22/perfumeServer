const express = require('express');
const router = express.Router();
const sendEmail = require('_helpers/send-email');
require("dotenv").config(); 
 
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 

router.post('/charge', async (req, res) => {
    try {
      const { amount, source, description, receipt_email, billing_details } = req.body;
  console.log(req.body)
      const charge = await stripe.charges.create({
        amount,
        currency: 'usd',
        source,
        description,
        receipt_email,
      });
      console.log(charge)
  
let message= `<p>The payment success with only ${amount}$</p>`;

      await sendEmail({
        to: receipt_email,
        subject: 'The payment success '+amount+'$ only',
        html: `<h4>The payment success</h4>
              ${message}>`
    });
      // Handle the success response
      res.status(200).json({ success: true, charge });
    } catch (error) {
      // Handle the error response
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  module.exports = router;