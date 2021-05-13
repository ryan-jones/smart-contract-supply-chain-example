import React from "react";
import { Item } from "src/interfaces/inventory";
import Button from "src/components/Button";
import "./Item.scss";

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
      <span>
        {index + 1}. <strong>{item.name}</strong>
      </span>
      <span>
        <strong>Price per unit:</strong> {item.price}
      </span>
      <span>
        <strong>Available:</strong> {item.amount}
      </span>
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
