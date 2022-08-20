import express from 'express'

import CartItem from '../models/CartItem.js';
import Promotion from '../models/Promotion.js';

const router = express.Router();

const postPromotion = async (req, res) => {
  const { item, type, minItem, multiple, discount, freebieItem } = req.body;
  try {
    const promotions = await Promotion.create({ item, type, minItem, multiple, discount, freebieItem });
    res.status(200).json(promotions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const applyPromotion = ({promotion, cartItems, cartItem }) => {

}

const checkout = async (req, res) => {
  const { cartId } = req.body;

  try {
    const cartItems = await CartItem.find({ cartId });

    for (const cartItem of cartItems) {
      const promotion = await Promotion.findOne({ item: cartItem.itemId });

      applyPromotion({ promotion, cartItems, cartItem });
    }
    // console.log(cartItems.reduce((total, item) => total + item.qty, 0));

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

router.post('/', checkout);

export default router;
