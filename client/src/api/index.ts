import { Item } from "src/interfaces/inventory";

const itemQuery = async (
  path: string,
  payload?: { method: string; body: string; headers: { [key: string]: string } }
) => {
  try {
    const res = await fetch(`http://localhost:4000/api/${path}`, payload);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Item[] = await res.json();
    return data;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

export const createItem = async (item: Item): Promise<Item[]> => {
  return itemQuery("items/create", {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchItems = async (): Promise<Item[]> => {
  return itemQuery("items");
};
