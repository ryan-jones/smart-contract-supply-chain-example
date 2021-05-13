import React from "react";
import { ICartItem } from "src/interfaces/inventory";

export const Total = ({ items }: { items: ICartItem[] }) => {
  const total = items.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0
  );
  return <p>Total Amount: {total}</p>;
};

export const SubTotal = ({
  quantity,
  price,
}: {
  quantity: number;
  price: number;
}) => {
  return <span>{(price || 0) * (quantity || 0)}</span>;
};
