import mongoose from "mongoose";
import { Item } from "../interfaces/items";

const ItemSchema = new mongoose.Schema({
  dateCreated: {
    default: Date.now(),
    type: Date,
  },
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
    min: 0,
  },
  amount: {
    required: true,
    type: Number,
    min: 0,
  },
});

export default mongoose.model<Item>("item", ItemSchema);
