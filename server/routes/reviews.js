const express = require('express');
const Review = require('../models/Review');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/reviews
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { product, message, rating } = req.body;
    const review = new Review({
      user: req.user._id,
      product,
      message,
      rating
    });
    const createdReview = await review.save();
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/reviews
// @access  Public
router.get('/', async (req, res) => {
  try {
    // If product query is passed, get reviews for product
    const { product } = req.query;
    const filter = product ? { product } : {};
    
    const reviews = await Review.find(filter).populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/reviews/:productId
// @access  Public
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name').sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
