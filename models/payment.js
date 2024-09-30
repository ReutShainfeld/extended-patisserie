const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
   
    cardNo: String,
    exp: String,
    cvv: String,
    amount: Number,


});

module.exports = mongoose.model('Payment', paymentSchema);
