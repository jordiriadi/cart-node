import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'carts'
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'items',
  },
  qty: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('cartItems', CartItemSchema);
