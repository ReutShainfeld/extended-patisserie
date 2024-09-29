const express = require('express');
const Payment = require('../models/payment');
const Cart = require('../models/cart');
const router = express.Router();

// router.post('/', (req, res) => {
//     const payment = new Payment(req.body);
//     payment.save()



//         .then(() => res.status(200).json({ message: 'Payment saved successfully' }))
//         .catch(err => res.status(500).json({ error: err.message }));
// });


router.post('/', async (req, res) => {
    try {
        const { userId, cardNo, exp, cvv, amount } = req.body; // Destructure payment data directly
        console.log('User ID:', userId);
        console.log('Payment Data:', { cardNo, exp, cvv, amount }); // Now logging the payment data

        // Create a new payment entry
        const payment = new Payment({ userId, cardNo, exp, cvv, amount }); // Adjust according to your Payment schema

        // Save the payment information to the database
        await payment.save();
        console.log('Payment saved successfully');

        // Clear the cart for the user after successful payment
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
