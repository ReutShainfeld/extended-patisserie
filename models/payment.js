const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add user reference
    cardNo: String,
    exp: String,
    cvv: String,
    amount: Number,


});

module.exports = mongoose.model('Payment', paymentSchema);
