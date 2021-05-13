import { IStatus } from "src/interfaces/checkout";
import { IOrderResponse } from "src/interfaces/orders";

const STATUS: IStatus[] = ["created", "paid", "delivered"];

export const createOrderAddress = async (
  orderManager,
  owner: string,
  total: number
): Promise<IOrderResponse> => {
  try {
    const orderResponse = await orderManager.methods
      .createOrder(new Date().toISOString(), total)
      .send({ from: owner });

    const order: IOrderResponse = {
      owner,
      total,
      recipientAddress: orderResponse.events.SupplyChainStep.address,
      orderAddress:
        orderResponse.events.SupplyChainStep.returnValues._itemAddress,
      status: STATUS[orderResponse.events.SupplyChainStep.returnValues._step],
    };
    return order;
  } catch (err) {
    throw new Error(err);
  }
};
