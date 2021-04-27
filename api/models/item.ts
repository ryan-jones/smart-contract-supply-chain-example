import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
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
  },
  amount: {
    required: true,
    type: Number,
  },
});

export interface Item extends mongoose.Document {
  amount: number;
  dateCreated: Date;
  name: string;
  price: number;
  id?: string;
}

export default mongoose.model<Item>("item", ItemSchema);
