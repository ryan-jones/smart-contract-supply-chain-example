import { IFormOrder, IOrder } from "src/interfaces/orders";
import { createOrder, fetchOrders } from "src/api";
import { Item } from "src/interfaces/inventory";
import { updateInventory } from "./inventory";
import { AppDispatch, AppThunk } from "..";

export const FETCH_ORDERS_START = "FETCH_ORDERS_START";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const CREATE_ORDER_START = "CREATE_ORDER_START";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";

export const createNewOrder = (order: IFormOrder): AppThunk => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch({
      type: CREATE_ORDER_START,
    });
    const inventory: Item[] = await createOrder(order);
    dispatch(updateInventory(inventory));
    dispatch({
      type: CREATE_ORDER_SUCCESS,
    });
  };
};

export const fetchUserOrders = (userId: string): AppThunk => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch({
      type: FETCH_ORDERS_START,
    });
    const orders: IOrder[] = await fetchOrders(userId);
    dispatch({
      type: FETCH_ORDERS_SUCCESS,
      payload: orders,
    });
  };
};
