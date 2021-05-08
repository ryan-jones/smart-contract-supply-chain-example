import { Request, Response, NextFunction } from "express";
import { IPurchasedItem, Item } from "interfaces/items";
import ItemService from "../services/itemService";

export async function getItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const items: Item[] = await ItemService.getItems();
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
    const newItem: Item = await ItemService.createItem(req.body);
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
    const result: Item = await ItemService.updateItem(
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
    const result: Item = await ItemService.deleteItem(req.params.id);
    getItems(req, res, next);
  } catch (err) {
    next(err);
  }
}
