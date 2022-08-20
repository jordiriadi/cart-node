import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: 'items',
  },
  type: {
    type: String,
    required: true,
  },
  minItem: {
    type: Number,
    required: true,
  },
  multiple: {
    type: Boolean,
    required: true,
  },
  discount: {
    type: Number,
  },
  freebieItem: {
    type: Schema.Types.ObjectId,
    ref: "items"
  }
}, { timestamps: true });

export default mongoose.model('promotions', PromotionSchema);
