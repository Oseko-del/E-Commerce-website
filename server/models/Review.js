const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  message: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
