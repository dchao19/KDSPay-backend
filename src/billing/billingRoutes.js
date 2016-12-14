import express from 'express';
import stripe from 'stripe';

let payments = stripe('sk_test_qfndc2aOVOlw9Je6c446ApYw');
let router = express.Router();

router.get('/payment', (req, res) => {
    res.render('payment.pug');
});

router.post('/payment/process', (req, res) => {
    let token = req.body.stripeToken;
    let charge = payments.charges.create({
        amount: 999,
        currency: 'usd',
        source: token,
        description: "Example charge"
    }, (err, charge) => {
        res.send("successful?");
    });
});

export default router;
