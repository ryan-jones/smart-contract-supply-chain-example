import { Item, IFormItem } from "src/interfaces/inventory";
import { IFormOrder, IOrder } from "src/interfaces/orders";

const query = async (
  path: string,
  payload?: { method: string; body: any; headers?: { [key: string]: string } }
) => {
  try {
    const res = await fetch(`http://localhost:4000/api/${path}`, payload);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data: any = await res.json();
    return data;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

export const createItem = async (item: IFormItem): Promise<Item[]> => {
  return query("items/create", {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchItems = async (): Promise<Item[]> => {
  return query("items");
};

export const createOrder = async (
  order: IFormOrder
): Promise<{ inventory: Item[]; orderId: string }> => {
  return query("orders/create", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchOrders = async (id: string): Promise<IOrder[]> => {
  return query(`orders/all/${id}`);
};

export const fetchOrder = async (
  owner: string,
  orderId: string
): Promise<IOrder> => {
  return query(`orders/one/${owner}`, {
    method: "POST",
    body: {
      orderId,
    },
  });
};
