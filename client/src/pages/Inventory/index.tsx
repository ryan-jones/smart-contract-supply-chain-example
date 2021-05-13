import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { Item } from "src/interfaces/inventory";
import { fetchInventory } from "src/store/actions/inventory";
import BaseLayout from "src/components/BaseLayout";
import ListItem from "src/components/Item";
import AddItem from "./AddItem";
import "./Inventory.scss";

const Inventory = () => {
  const { items } = useAppSelector((state) => state.inventory);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchInventory());
      setLoading(false);
    };
    init();
  }, []);

  return (
    <BaseLayout loading={loading}>
      <div className="inventory">
        <div className="itemList">
          <h2>Item List</h2>
          {!loading &&
            (items.length > 0 ? (
              items.map((it: Item, index: number) => (
                <ListItem item={it} index={index} />
              ))
            ) : (
              <p>No items available</p>
            ))}
        </div>
        <div className="updateList">
          <AddItem />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Inventory;
