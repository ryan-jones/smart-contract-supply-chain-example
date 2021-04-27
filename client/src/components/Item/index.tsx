import React from "react";
import { Item } from "src/interfaces/inventory";
import Button from "src/components/Button";
import "./Item.css";

interface Props {
  addToCart?: (item: Item) => void;
  index: number;
  item: Item;
  disabled?: boolean;
  shop?: boolean;
}
const ListItem = ({ index, item, shop, addToCart, disabled }: Props) => {
  return (
    <div className="item" key={item._id}>
      {index + 1}. {item.name} Price per unit: {item.price} Qty: {item.amount}
      {shop && (
        <Button
          disabled={Boolean(disabled)}
          onClick={() => addToCart && addToCart(item)}
        >
          {disabled ? "Added to cart" : "Add to cart"}
        </Button>
      )}
    </div>
  );
};

export default ListItem;
