import { ICartItem, IFormOrderItem } from "./inventory";

export interface IOrderResponse {
  orderAddress: string;
  owner: string;
  recipientAddress: string;
  status: "created" | "paid" | "delivered";
  total: number;
}
export interface IFormOrder extends IOrderResponse {
  orderItems: IFormOrderItem[];
}

export interface IOrder extends IOrderResponse {
  _id: string;
  orderItems: ICartItem[];
}
