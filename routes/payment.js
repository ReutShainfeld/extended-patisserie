const express = require('express');
const Payment = require('../models/payment');
const router = express.Router();

router.post('/', (req, res) => {
    const payment = new Payment(req.body);
    payment.save()
        .then(() => res.status(200).json({ message: 'Payment saved successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
