const express = require('express');
const router = express.Router();
const paymentService = require('./payment.service');
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');

require("dotenv").config(); 
 
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 

router.post('/charge', async (req, res) => {
    try {
      const { accountID, amount, source, description } = req.body;
  
      const charge = await stripe.charges.create({
        accountID,
        amount,
        currency: 'usd',
        source,
        description,
      });
  
      // Handle the success response
      res.status(200).json({ success: true, charge });
    } catch (error) {
      // Handle the error response
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  module.exports = router;