/** @format */

import React, { useState, useEffect } from "react";

import ItemManagerContract from "../../contracts/ItemManager.json";
import ItemContract from "../../contracts/Item.json";
import useWeb3 from "../../hooks/useWeb3";
import "./Inventory.css";

const Inventory = () => {
  const [paymentAddress, setPaymentAddress] = useState(null);
  const [itemsList, setItemsList] = useState([]);
  const [itemName, setItemName] = useState("");
  const [item, setItem] = useState(null);
  const [itemManager, setItemManager] = useState(null);
  const [cost, setCost] = useState(0);

  const { owner, createContract } = useWeb3();

  useEffect(() => {
    const init = async () => {
      const itemManagerInstance = await createContract(ItemManagerContract);
      const itemInstance = await createContract(ItemContract);
      setItem(itemInstance);
      setItemManager(itemManagerInstance);
      if (itemManagerInstance) {
        itemManagerInstance.events
          .SupplyChainStep()
          .on("data", async (event) => {
            console.log("trigger", event);
          });
      }
    };
    init();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log("itemManager", itemManager);
      const result = await itemManager.methods
        .createItem(itemName, cost)
        .send({ from: owner });
      console.log("result", result);
      setItemsList((prev) => [
        ...prev,
        {
          name: itemName,
          price: cost,
          address: result.events.SupplyChainStep.returnValues._itemAddress,
        },
      ]);
      setCost(0);
      setItemName("");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="itemManagement">
      <div className="itemList">
        <h2>Item List</h2>
        {itemsList.map((it) => (
          <div>
            {it.name} - {it.price} - {it.address}
          </div>
        ))}
        <div className="addItem">
          <div className="addItem__listItem">
            <div className="inputContainer">
              <label htmlFor="itemName">Name:</label>
              <input
                id="itemName"
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="price">Price (in wei)</label>
              <input
                id="price"
                type="text"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
          </div>
          <button
            className="addItem__btn"
            disabled={!itemName.length || !cost}
            onClick={handleSubmit}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
