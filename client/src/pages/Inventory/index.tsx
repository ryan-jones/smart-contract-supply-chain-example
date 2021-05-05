/** @format */

import React, { useState, useEffect } from "react";
import { Item } from "src/interfaces/inventory";
// import useWeb3 from "src/hooks/useWeb3";
import { fetchItems, createItem } from "src/api";

import BaseLayout from "src/components/BaseLayout";
import ListItem from "src/components/Item";
import AddItem from "./AddItem";
import "./Inventory.scss";

const Inventory = () => {
  const [itemsList, setItemsList] = useState<Item[]>([]);

  // const { owner, createContract } = useWeb3();

  // useEffect(() => {
  //   const init = async (): Promise<void> => {
  //     const itemManagerInstance = await createContract(ItemManagerContract);
  //     const itemInstance = await createContract(ItemContract);
  //     setItemManager(itemManagerInstance);
  //     if (itemManagerInstance) {
  //       itemManagerInstance.events
  //         .SupplyChainStep()
  //         .on("data", async (event) => {
  //           console.log("trigger", event);
  //         });
  //     }
  //   };
  //   init();
  // }, []);

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

  const onSubmit = async (item: Item) => {
    try {
      const items: Item[] = await createItem(item);
      setItemsList(items);
    } catch (err) {
      console.log("error onSubmit", err);
    }
  };

  return (
    <BaseLayout>
      <div className="inventory">
        <div className="itemList">
          <h2>Item List</h2>

          {itemsList.map((it: Item, index: number) => (
            <ListItem item={it} index={index} />
          ))}
        </div>
        <div className="updateList">
          <AddItem onSubmit={onSubmit} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Inventory;
