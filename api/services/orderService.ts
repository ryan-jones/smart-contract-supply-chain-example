import Order from "../models/Order";
import { IOrder } from "../interfaces/orders";

type MongoParam = { [key: string]: any };

const getOrders = async (owner: string): Promise<IOrder[]> => {
  const results: IOrder[] = await Order.find({ owner })
    .sort({
      dateCreated: "desc",
    })
    .lean();
  return results;
};

const createOrder = async (order: IOrder): Promise<IOrder> => {
  const newOrder: IOrder = new Order(order);
  const result: IOrder = await newOrder.save();
  return result;
};

const updateOrder = async (
  identifier: MongoParam,
  updater: MongoParam,
  makeNew?: MongoParam
): Promise<IOrder> => {
  const updatedOrder: IOrder = await Order.findOneAndUpdate(
    identifier,
    updater,
    makeNew
  ).lean();
  return updatedOrder;
};

export default { getOrders, createOrder, updateOrder };
