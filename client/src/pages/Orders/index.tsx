import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOrder } from "src/interfaces/orders";
import BaseLayout from "src/components/BaseLayout";
import { ICartItem } from "src/interfaces/inventory";
import useWeb3 from "src/hooks/useWeb3";
import { fetchUserOrders } from "src/store/actions/orders";
import "./Orders.scss";

const Orders = () => {
  const dispatch = useDispatch();
  const { items: orders } = useSelector((state: any) => state.orders);
  const { owner } = useWeb3();

  useEffect(() => {
    dispatch(fetchUserOrders(owner));
  }, [dispatch]);

  return (
    <BaseLayout>
      <div className="orderPage">
        {orders.map((order: IOrder, index: number) => (
          <div className="order" key={order._id}>
            <h2>
              Order {index} - {order.status}
            </h2>
            {order.orderItems.map((item: ICartItem) => (
              <div key={item._id}>
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
