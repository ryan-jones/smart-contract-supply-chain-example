import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Item } from "src/interfaces/inventory";
import { addToShoppingCart } from "src/store/actions/shoppingCart";
import { fetchInventory } from "src/store/actions/inventory";
import BaseLayout from "src/components/BaseLayout";
import ListItem from "src/components/Item";
import "./Shop.scss";

const Shop = () => {
  const dispatch = useDispatch();
  const { items, hasFetched } = useSelector((state: any) => state.inventory);

  useEffect(() => {
    if (!items.length && !hasFetched) {
      dispatch(fetchInventory());
    }
  }, [items, hasFetched]);

  const addToCart = (item: Item) => {
    dispatch(addToShoppingCart({ ...item, quantity: 1 }));
  };

  return (
    <BaseLayout>
      <div className="shop">
        <div className="itemList">
          <h2>Item List</h2>

          {items.map((it: Item, index: number) => (
            <ListItem
              key={`${it._id}-${index}`}
              shop
              addToCart={addToCart}
              item={it}
              index={index}
            />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Shop;
