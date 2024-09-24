const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

router.post('/', (req, res) => {
    const cart = new Cart(req.body);
    cart.save()
        .then(() => res.status(200).json({ message: 'Cart saved successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
