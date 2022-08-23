import CartItem from '../models/CartItem.js';
import Promotion from '../models/Promotion.js';

const applyPromotion = ({promotion, cartItems, cartItem, item }) => {
  if (cartItem.qty < promotion.minItem) return 0;

  if (promotion.type === 'discount') {
    const totalPrice = item.price * cartItem.qty;

    return totalPrice / 100 * promotion.discount;
  } else if (promotion.type === 'freebie') {
    const freebieInCartCount = cartItems.find((cItem) => cItem.item._id.toString() === promotion.freebieItem._id.toString()).qty;

    // Get smallest between Freebie Item in cart & Claimable Freebie.
    const freebieCount = Math.min(freebieInCartCount, Math.floor(cartItem.qty / promotion.minItem));

    return freebieCount*promotion.freebieItem.price;
  }
};

const checkout = async (_obj, { cartId }) => {
  try {
    let total = 0;
    const cartItems = await CartItem.find({ cart: cartId }).populate('item');

    for (const cartItem of cartItems) {
      total += cartItem.qty * cartItem.item.price;

      const promotion = await Promotion.findOne({ item: cartItem.item._id }).populate('freebieItem');

      if (!promotion) continue;

      const discount = applyPromotion({ promotion, cartItems, cartItem, item: cartItem.item });

      total -= discount;
    }
    return total;
  } catch (error) {
    throw new Error(error);
  }
}

export default { checkout, applyPromotion };
