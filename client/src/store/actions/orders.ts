import { push } from "connected-react-router";
import { createOrder, fetchOrders } from "src/api";
import { IFormOrder, IOrder } from "src/interfaces/orders";
import { Item } from "src/interfaces/inventory";
import { clearShoppingCart } from "src/utils/localStorage";
import { updateInventory } from "./inventory";
import { AppDispatch, AppThunk } from "..";
import { toastError, toastSuccess } from "src/utils/toasters";

export const FETCH_ORDERS_START = "FETCH_ORDERS_START";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const CREATE_ORDER_START = "CREATE_ORDER_START";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";

export const createNewOrder = (order: IFormOrder): AppThunk => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({
        type: CREATE_ORDER_START,
      });
      const {
        inventory,
        orderId,
      }: { inventory: Item[]; orderId: string } = await createOrder(order);
      dispatch(updateInventory(inventory));
      dispatch({
        type: CREATE_ORDER_SUCCESS,
      });
      clearShoppingCart();
      toastSuccess("Order successfully submitted!", orderId);
      dispatch(
        push(`/orders/confirmation?order=${orderId}`, {
          order: { ...order, _id: orderId },
        })
      );
    } catch (err) {
      console.log("err", err);
      toastError(err, order.orderAddress);
    }
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
