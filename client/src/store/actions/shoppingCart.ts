import { retrieveShoppingCart, setShoppingCart } from "src/utils/localStorage";
import { ICartItem } from "src/interfaces/inventory";
import { AppDispatch, AppThunk } from "..";
import { toastSuccess } from "src/utils/toasters";

export const UPDATE_SHOPPING_CART = "UPDATE_SHOPPING_CART";

export const updateCart = (payload: ICartItem[]) => ({
  type: UPDATE_SHOPPING_CART,
  payload,
});

export const fetchShoppingCart = (): AppThunk => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const latestSession: ICartItem[] = retrieveShoppingCart();
    dispatch(updateCart(latestSession));
  };
};

export const addToShoppingCart = (item: ICartItem): AppThunk => {
  return async (dispatch: AppDispatch, getState): Promise<void> => {
    const updatedCart: ICartItem[] = [...getState().shoppingCart.items];
    const itemInCart: number = updatedCart.findIndex(
      (i: ICartItem) => i._id === item._id
    );
    if (itemInCart >= 0) {
      updatedCart[itemInCart] = {
        ...updatedCart[itemInCart],
        quantity: Number(updatedCart[itemInCart].quantity) + 1,
      };
    } else {
      updatedCart.push(item);
    }
    dispatch(updateCart(updatedCart));
    setShoppingCart(updatedCart);
    toastSuccess(`${item.name} added to cart`, item._id, { autoClose: 1000 });
  };
};

export const removeFromShoppingCart = (item: ICartItem): AppThunk => {
  return async (dispatch: AppDispatch, getState): Promise<void> => {
    const updatedCart: ICartItem[] = [...getState().shoppingCart.items];
    const index = updatedCart.findIndex((i: ICartItem) => i._id === item._id);
    if (index >= 0) {
      updatedCart.splice(index, 1);
    }
    setShoppingCart(updatedCart);
    dispatch(updateCart(updatedCart));
  };
};

export const updateShoppingCart = (item: ICartItem): AppThunk => {
  return async (dispatch: AppDispatch, getState): Promise<void> => {
    const updatedCart: ICartItem[] = [...getState().shoppingCart.items];
    const index = updatedCart.findIndex((i: ICartItem) => i._id === item._id);
    if (index >= 0) {
      updatedCart.splice(index, 1, item);
    }
    setShoppingCart(updatedCart);
    dispatch(updateCart(updatedCart));
  };
};
