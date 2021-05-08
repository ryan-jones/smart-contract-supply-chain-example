export interface Item {
  name: string;
  price: number;
  amount: number;
  _id: string;
}

export interface IFormItem extends Omit<Item, "_id"> {
  quantity: number;
}

export interface ICartItem extends Item {
  quantity: number;
}

export interface IFormOrderItem {
  _id: string;
  quantity: number;
}
