const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [
        {
            id: String,
            name: String,
            category: String,
            price: Number,
            qty: Number
        }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);
