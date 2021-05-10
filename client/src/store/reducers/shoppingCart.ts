import { Item } from "src/interfaces/inventory";
import { UPDATE_SHOPPING_CART } from "../actions/shoppingCart";

export interface IShoppingCartState {
  items: Item[];
}
const initialState: IShoppingCartState = {
  items: [],
};

const shoppingCartReducer = (
  state: IShoppingCartState = initialState,
  action
) => {
  switch (action.type) {
    case UPDATE_SHOPPING_CART:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default shoppingCartReducer;
