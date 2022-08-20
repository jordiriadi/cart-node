import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartSchema = new Schema({}, { timestamps: true });

export default mongoose.model('carts', CartSchema);
