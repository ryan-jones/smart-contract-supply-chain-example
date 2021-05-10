import { Item } from "src/interfaces/inventory";
import {
  UPDATE_INVENTORY,
  FETCH_INVENTORY_SUCCESS,
} from "../actions/inventory";

export interface InventoryState {
  items: Item[];
  loading: Boolean;
  hasFetched: Boolean;
}

const initialState: InventoryState = {
  items: [],
  loading: false,
  hasFetched: false,
};

const inventoryReducer = (state: InventoryState = initialState, action) => {
  switch (action.type) {
    case FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        items: action.payload,
        hasFetched: true,
      };
    case UPDATE_INVENTORY:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default inventoryReducer;
