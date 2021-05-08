import mongoose from "mongoose";
import { IPurchasedItem } from "./items";

export interface IOrder extends mongoose.Document {
  dateCreated: Date;
  owner: string;
  recipientAddress: string;
  orderAddress: string;
  status: "created" | "paid" | "delivered";
  total: number;
  orderItems: IPurchasedItem[];
}
