const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();


router.post('/', async (req, res) => {
    const { userId, items } = req.body;  // Extract userId and items from the request body

    try {
        // Find the user's cart by their userId
        let userCart = await Cart.findOne({ userId });

        if (userCart) {
            // If the user already has a cart, update it
            userCart.items = items;
            await userCart.save();
        } else {
            // If no cart exists for the user, create a new one
            const newCart = new Cart({ userId, items });
            await newCart.save();
        }

        res.status(200).json({ message: 'Cart saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const userCart = await Cart.findOne({ userId: req.params.userId });
        if (userCart) {
            res.status(200).json(userCart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

