import { createItem, fetchItems } from "src/api";
import { IFormItem, Item } from "src/interfaces/inventory";
import { AppDispatch, AppThunk } from "..";

export const FETCH_INVENTORY_SUCCESS = "FETCH_INVENTORY_SUCCESS";
export const UPDATE_INVENTORY = "UPDATE_INVENTORY";
export const CREATE_ITEM = "CREATE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

export const updateInventory = (payload: Item[]) => ({
  type: UPDATE_INVENTORY,
  payload,
});

export const createNewItem = (item: IFormItem): AppThunk => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const inventory: Item[] = await createItem(item);
    dispatch(updateInventory(inventory));
  };
};

export const fetchInventory = (): AppThunk => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const inventory: Item[] = await fetchItems();
    dispatch({
      type: FETCH_INVENTORY_SUCCESS,
      payload: inventory,
    });
  };
};
