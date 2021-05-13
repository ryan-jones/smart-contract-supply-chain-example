import { ICartItem } from "src/interfaces/inventory";

export const aggregate = (items: ICartItem[]): number =>
  items.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0
  );
