
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add user reference
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

