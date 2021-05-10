import React from "react";
import BaseLayout from "src/components/BaseLayout";
import { ICartItem } from "src/interfaces/inventory";
import { Link } from "react-router-dom";
import Button from "src/components/Button";

interface Props {
  order: {
    owner: string;
    total: number;
    recipientAddress: string;
    orderAddress: string;
    status: string;
    orderItems: ICartItem[];
  };
}
export const OrderConfirmationPage = ({ order }: Props) => {
  return (
    <BaseLayout>
      <div>
        <h1>Order successfully submitted</h1>
        <h2>Transfer funds to complete order</h2>
        {order.orderItems.map((item: ICartItem) => (
          <div>
            <p>{item.name}</p>
            <p>
              Qty: {item.quantity} x {item.price} = {item.quantity * item.price}
            </p>
          </div>
        ))}
        Order Total:{order.total}
        <Link to="/orders">Manage orders</Link>
        <Button disabled={false} onClick={() => {}}>
          Complete payment
        </Button>
      </div>
    </BaseLayout>
  );
};

export default OrderConfirmationPage;
