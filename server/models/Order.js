const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email: String,
    sessionId: { type: String, unique: true },
    productName: String,
    amount: Number,
    status: String,
});

module.exports = mongoose.model('Order', orderSchema);