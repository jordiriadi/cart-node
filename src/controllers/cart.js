import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Item from '../models/Item.js';

const initCart = async () => {
  try {
    const result = await Cart.create({});

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const addItemToCart = async (_, { cartId, itemId, qty },) => {
  try {
    const cartData = await CartItem.findOne({ cart: cartId, item: itemId });
    const itemData = await Item.findById(itemId);

    if ((cartData?.qty || 0) + qty > itemData.qty) {
      throw new Error("Quantity exceeded stocks");
    }

    const calculatedQty = (cartData?.qty || 0) + qty;

    if (!cartData) {
      const cartItem = await CartItem.create({ cart: cartId, item: itemId, qty: calculatedQty });

      return cartItem;
    }

    const updateRes = await CartItem.findOneAndUpdate({ cart: cartId, item: itemId }, { qty: calculatedQty }, { new: true });
    return updateRes;
  } catch (error) {
    throw new Error(error);
  }
}


export default { initCart, addItemToCart };
