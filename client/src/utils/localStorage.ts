import { ICartItem } from "src/interfaces/inventory";

export const retrieveShoppingCart = (): ICartItem[] => {
  const shoppingCart = localStorage.getItem("shoppingCart");
  return shoppingCart ? JSON.parse(shoppingCart) : [];
};

export const setShoppingCart = (cart: ICartItem[]) => {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
};

export const clearShoppingCart = () => {
  localStorage.removeItem("shoppingCart");
};
