import { IOrder } from "src/interfaces/orders";
import { FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS } from "../actions/orders";

export interface IOrderState {
  items: IOrder[];
  loading: boolean;
}
const initialState: IOrderState = {
  items: [],
  loading: false,
};

const ordersReducer = (state: IOrderState = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;
