import Product from "../models/item";
import { Item, IPurchasedItem } from "../interfaces/items";

type MongoParam = { [key: string]: any };

export const getItems = async (ids?: string[]): Promise<Item[]> => {
  const items: Item[] = await Product.find(ids && { _id: { $in: ids } }).lean();
  return items;
};

export const getItem = async (id: number): Promise<Item> => {
  const item: Item = await Product.findOne({ id });
  return item;
};

export const createItem = async (item): Promise<Item> => {
  const newItem: Item = new Product(item);
  const result: Item = await newItem.save();
  return result;
};

export const updateItem = async (
  identifier: MongoParam,
  updater: MongoParam,
  makeNew?: MongoParam
): Promise<Item> => {
  const updatedItem: Item = await Product.findOneAndUpdate(
    identifier,
    updater,
    makeNew
  ).lean();
  return updatedItem;
};

export const deleteItem = async (id: string): Promise<Item> => {
  const result: Item = await Product.findOneAndRemove({ _id: id }).lean();
  return result;
};

export const updateInventory = async (item: IPurchasedItem): Promise<Item> => {
  try {
    const updatedItem: Item = await updateItem(
      { _id: item._id, amount: { $gte: 0 } },
      { $inc: { amount: -item.quantity } }
    );
    return updatedItem;
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  getItems,
  updateItem,
  deleteItem,
  createItem,
  getItem,
  updateInventory,
};
