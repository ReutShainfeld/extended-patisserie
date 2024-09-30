const express = require('express');
const Payment = require('../models/payment');
const Cart = require('../models/cart');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { userId, cardNo, exp, cvv, amount } = req.body; // Destructure payment data directly
        console.log('User ID:', userId);
        console.log('Payment Data:', { cardNo, exp, cvv, amount }); 

        const payment = new Payment({ userId, cardNo, exp, cvv, amount }); 

        await payment.save();
        console.log('Payment saved successfully');

        const result = await Cart.deleteOne({ userId });
        console.log('Delete result:', result);

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Cart not found or already empty.' });
        }

        // Send a success response if everything was successful
        res.status(201).json({ message: 'Payment successful, cart cleared.' });

    } catch (err) {
        // Catch and send error if something goes wrong
        console.error('Error saving payment or deleting cart:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});




module.exports = router;
