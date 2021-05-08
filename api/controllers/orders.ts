import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";
import { IPurchasedItem, Item } from "../interfaces/items";
import { IOrder } from "../interfaces/orders";
import ItemService from "../services/itemService";
import OrderService from "../services/orderService";

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results: IOrder[] = await OrderService.getOrders(req.params.id);
    const orders = await Promise.all(
      results.map(async (result: IOrder) => {
        const orderItems: Item[] = await ItemService.getItems(
          result.orderItems.map((item: IPurchasedItem) => item._id)
        );
        return {
          ...result,
          orderItems: orderItems.map((item: Item) => ({
            ...item,
            quantity: result.orderItems.find(
              (i: IPurchasedItem) => i._id == item._id
            ).quantity,
          })),
        };
      })
    );
    res.send(orders);
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newOrder: IOrder = await OrderService.createOrder(req.body);
    const updatedInventory: Item[] = await Promise.all(
      req.body.orderItems.map(async (item: IPurchasedItem) => {
        const updatedItem: Item = await ItemService.updateInventory(item);
        return updatedItem;
      })
    );
    const items: Item[] = ItemService.getItems();
    res.send(items);
  } catch (err) {
    next(err);
  }
};

export const editOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result: IOrder = await OrderService.updateOrder(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    getOrders(req, res, next);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result: IOrder = await Order.findOneAndRemove({ _id: req.params.id });
    getOrders(req, res, next);
  } catch (err) {
    next(err);
  }
};
