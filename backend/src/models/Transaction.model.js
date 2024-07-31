// models/Transaction.model.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  sessionId: String,
  amount: Number,
  currency: String,
  paymentStatus: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  createdAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
