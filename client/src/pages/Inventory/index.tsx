import React, { useEffect } from "react";
import { Item } from "src/interfaces/inventory";
import { useDispatch, useSelector } from "react-redux";
import BaseLayout from "src/components/BaseLayout";
import ListItem from "src/components/Item";
import AddItem from "./AddItem";
import "./Inventory.scss";
import { fetchInventory } from "src/store/actions/inventory";

const Inventory = () => {
  const { items } = useSelector((state: any) => state.inventory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInventory());
  }, []);

  return (
    <BaseLayout>
      <div className="inventory">
        <div className="itemList">
          <h2>Item List</h2>

          {items.map((it: Item, index: number) => (
            <ListItem item={it} index={index} />
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
