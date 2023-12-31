const db = require("_helpers/db");
const stripe = require('stripe')('sk_test_51OS2RvH1jy8FFcmKQsuwosYFyd8b9pbkD92YF3OYi7jEjLtyMcxc9JzYo5jfzZ4832CKOEXdYOAoAqV09kEtdSJP00OtoGqSd2');

module.exports = {
    processPayment,
    createPaymentIntent
};

async function createPaymentIntent(params, origin) {

    try {
        const { amount } = req.body;
    
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'usd',
        }); 

        const payment = new db.Parfume({
            clientSecret: paymentIntent.client_secret,
          });

        // save account
        await payment.save();
    
        res.json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        res.status(500).json({ error: 'Internal server error' });
      }


}


async function processPayment(params, origin) {

    try {
        const { stripeToken } = req.body;
    
        const charge = await stripe.charges.create({
          amount: 1000,
          currency: 'usd',
          source: stripeToken,
          description: 'Example Charge',
        });
    
        // Update the payment status in MongoDB
        await Payment.findOneAndUpdate(
          { clientSecret: req.body.stripeToken },
          { paymentStatus: 'success' },
        );
    
        res.json({ success: true });
      } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Internal server error' });
      }




}
