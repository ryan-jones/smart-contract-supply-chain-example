import Product, { Item } from "../models/item";
import { Request, Response, NextFunction } from "express";

export async function getItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const items: Item[] = await Product.find();
    res.send(items);
  } catch (err) {
    next(err);
  }
}

export async function createItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newItem: Item = new Product(req.body);
    const result: Item = await newItem.save();
    getItems(req, res, next);
  } catch (err) {
    next(err);
  }
}

export async function editItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result: Item = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    getItems(req, res, next);
  } catch (err) {
    next(err);
  }
}

export async function deleteItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result: Item = await Product.findOneAndRemove({ _id: req.params.id });
    getItems(req, res, next);
  } catch (err) {
    next(err);
  }
}
