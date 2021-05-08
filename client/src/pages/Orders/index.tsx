import React, { useEffect, useState } from "react";
import { fetchOrders } from "src/api";

import { IOrder } from "src/interfaces/orders";
import BaseLayout from "src/components/BaseLayout";
import { ICartItem } from "src/interfaces/inventory";
import useWeb3 from "src/hooks/useWeb3";

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { owner } = useWeb3();

  useEffect(() => {
    const init = async () => {
      try {
        const orders: IOrder[] = await fetchOrders(owner);
        if (orders.length) {
          setOrders(orders);
        }
      } catch (err) {
        console.log("err onfetch", err);
      }
    };
    init();
  }, []);

  return (
    <BaseLayout>
      <div>
        {orders.map((order: IOrder, index: number) => (
          <div key={order._id}>
            <h2>
              Order {index} - {order.status}
            </h2>
            {order.orderItems.map((item: ICartItem) => (
              <div>
                <p>
                  {item.name} - {item.quantity}
                </p>
              </div>
            ))}
            <p>Order Total: {order.total}</p>
          </div>
        ))}
      </div>
    </BaseLayout>
  );
};

export default Orders;
