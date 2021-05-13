import Order from "../models/Order";
import { IOrder } from "../interfaces/orders";
import { notFound } from "../utils/errors";

type MongoParam = { [key: string]: any };

const getOrders = async (owner: string): Promise<IOrder[]> => {
  const results: IOrder[] = await Order.find({ owner })
    .sort({
      dateCreated: "desc",
    })
    .lean();
  if (!results) {
    throw notFound();
  }
  return results;
};

const getOrder = async (owner: string, id: string): Promise<IOrder> => {
  const result: IOrder = await Order.findById(id).lean();
  if (!result || result.owner !== owner) {
    throw notFound();
  }
  return result;
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

export default { getOrders, getOrder, createOrder, updateOrder };
