import express from 'express'

import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Item from '../models/Item.js';

const router = express.Router();

const initCart = async (req, res) => {
  try {
    const result = await Cart.create({});
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addCart = async (req, res) => {
  const { cartId, itemId, qty } = req.body;
  try {
    const cartData = await CartItem.findOne({ cartId, itemId });
    const itemData = await Item.findById(itemId);

    if ((cartData?.qty || 0) + qty > itemData.qty) {
      res.status(500).json("Quantity exceeded stocks");
      return;
    }

    const calculatedQty = (cartData?.qty || 0) + qty;

    if (!cartData) {
      const cartItem = await CartItem.create({ cartId, itemId, qty: calculatedQty });

      res.status(200).json(cartItem);
      return;
    }

    const updateRes = await CartItem.findOneAndUpdate({ cartId, itemId }, { qty: calculatedQty }, { new: true });
    res.status(200).json(updateRes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

router.post('/', addCart);
router.post('/init', initCart);

export default router;
