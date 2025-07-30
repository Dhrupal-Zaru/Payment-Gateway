const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    const { email, productName, amount } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: productName },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            }],
            customer_email: email,
            success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: 'http://localhost:5173/cancel',
            metadata: {
                productName: productName,
            },
        });
        res.json({ id: session.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/session/:id', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.id);

        const existingOrder = await Order.findOne({ sessionId: session.id });
        if (existingOrder) {
            return res.json({ success: true });
        }

        // Save order in DB
        const order = new Order({
            email: session.customer_email,
            sessionId: session.id,
            productName: session.metadata?.productName || "Unknown Product",
            amount: session.amount_total / 100,
            status: session.payment_status,
        });

        await order.save();

        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ error: 'Invalid session ID' });
    }
});

module.exports = router;
