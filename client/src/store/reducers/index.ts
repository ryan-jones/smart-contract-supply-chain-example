import { combineReducers } from "redux";

import shoppingCart, { IShoppingCartState } from "./shoppingCart";
import inventory, { InventoryState } from "./inventory";
import orders, { IOrderState } from "./orders";

export type RootState = {
  shoppingCart: IShoppingCartState;
  inventory: InventoryState;
  orders: IOrderState;
};

const rootReducer = combineReducers({
  shoppingCart,
  inventory,
  orders,
});

export default rootReducer;
