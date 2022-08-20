import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  sku: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
  }
}, { timestamps: true });

export default mongoose.model('items', ItemSchema);
