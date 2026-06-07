const express = require('express');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/cart
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { items } = req.body; 
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = new Cart({
        user: req.user._id,
        items
      });
      await cart.save();
    }
    
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
