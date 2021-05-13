import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import shoppingCart, { IShoppingCartState } from "./shoppingCart";
import inventory, { InventoryState } from "./inventory";
import orders, { IOrderState } from "./orders";

export type RootState = {
  shoppingCart: IShoppingCartState;
  inventory: InventoryState;
  orders: IOrderState;
};

const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    shoppingCart,
    inventory,
    orders,
  });

export default rootReducer;
