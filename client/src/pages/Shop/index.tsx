import React, { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";

import { Item } from "src/interfaces/inventory";
import { addToShoppingCart } from "src/store/actions/shoppingCart";
import { fetchInventory } from "src/store/actions/inventory";
import BaseLayout from "src/components/BaseLayout";
import ListItem from "src/components/Item";
import "./Shop.scss";

const Shop = () => {
  const dispatch = useAppDispatch();
  const { items: inventory, hasFetched } = useAppSelector(
    (state) => state.inventory
  );
  useEffect(() => {
    if (!inventory.length && !hasFetched) {
      dispatch(fetchInventory());
    }
  }, [inventory, hasFetched]);

  const addToCart = useCallback(
    (item: Item) => {
      dispatch(addToShoppingCart({ ...item, quantity: 1 }));
    },
    [dispatch]
  );

  return (
    <BaseLayout>
      <div className="shop">
        <div className="itemList">
          <h2>Item List</h2>

          {inventory.map((it: Item, index: number) => (
            <ListItem
              key={`${it._id}-${index}`}
              shop
              addToCart={addToCart}
              item={it}
              index={index}
              disabled={!it.amount}
            />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Shop;
