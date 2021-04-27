import React, { useEffect, useState } from "react";

import { fetchItems } from "src/api";
import { Item } from "src/interfaces/inventory";

import BaseLayout from "src/components/BaseLayout";
import ListItem from "src/components/Item";
import ShoppingCart from "./ShoppingCart";
import "./Shop.css";

export interface ICartItem extends Item {
  quantity: number;
}

const Shop = () => {
  const [itemsList, setItemsList] = useState<Item[]>([]);
  const [shoppingCart, setShoppingCart] = useState<ICartItem[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const items: Item[] = await fetchItems();
        if (items) {
          setItemsList(items);
        }
      } catch (err) {
        console.log("error onfetch", err);
      }
    };
    init();
  }, []);

  const addToCart = (item: Item) => {
    setShoppingCart((prev: ICartItem[]) => [...prev, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (item: ICartItem) => {
    setShoppingCart((prev: ICartItem[]) =>
      prev.filter((listItem: ICartItem) => listItem._id !== item._id)
    );
  };

  return (
    <BaseLayout>
      <div className="shop">
        <div className="itemList">
          <h2>Item List</h2>

          {itemsList.map((it: Item, index: number) => (
            <ListItem
              key={`${it._id}-${index}`}
              shop
              disabled={shoppingCart.some(
                (item: ICartItem) => item._id === it._id
              )}
              addToCart={addToCart}
              item={it}
              index={index}
            />
          ))}
        </div>
        <div className="shoppingCart">
          <h2>Checkout</h2>
          <ShoppingCart
            removeFromCart={removeFromCart}
            selectedItems={shoppingCart}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Shop;
