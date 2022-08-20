import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'carts'
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: 'items',
  },
  qty: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('cartItems', CartItemSchema);
