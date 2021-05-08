import { ICartItem, IFormOrderItem } from "./inventory";

export interface IFormOrder {
  orderAddress: string;
  orderItems: IFormOrderItem[];
  owner: string;
  recipientAddress: string;
  status: "created" | "paid" | "delivered";
  total: number;
}

export interface IOrder extends Omit<IFormOrder, "orderItems"> {
  _id: string;
  orderItems: ICartItem[];
}
