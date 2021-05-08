import mongoose from "mongoose";
import { IPurchasedItem } from "../interfaces/items";
import { IOrder } from "../interfaces/orders";

const PurchasedItemSchema = new mongoose.Schema({
  _id: {
    required: true,
    type: String,
  },
  quantity: {
    required: true,
    type: Number,
  },
});

const OrderSchema = new mongoose.Schema({
  dateCreated: {
    default: Date.now(),
    type: Date,
  },
  owner: {
    required: true,
    type: String,
  },
  recipientAddress: {
    required: true,
    type: String,
  },
  orderAddress: {
    required: true,
    type: String,
  },
  status: {
    required: true,
    type: String,
    enum: ["created", "paid", "delivered"],
  },
  total: {
    required: true,
    type: Number,
    min: 0,
  },
  orderItems: {
    required: true,
    type: [PurchasedItemSchema],
  },
});

export default mongoose.model<IOrder>("order", OrderSchema);
