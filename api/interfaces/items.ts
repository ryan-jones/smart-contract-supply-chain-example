import mongoose from "mongoose";

export interface Item extends mongoose.Document {
  amount: number;
  dateCreated: Date;
  name: string;
  price: number;
}

export interface IPurchasedItem {
  _id: string;
  quantity: number;
}

export interface IOrderItem extends IPurchasedItem {
  name: string;
  price: number;
}
