import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import useWeb3 from "src/hooks/useWeb3";
import { fetchUserOrders } from "src/store/actions/orders";
import { IOrder } from "src/interfaces/orders";
import { ICartItem } from "src/interfaces/inventory";
import BaseLayout from "src/components/BaseLayout";
import "./Orders.scss";

const Orders = () => {
  const dispatch = useAppDispatch();
  const { items: orders } = useAppSelector((state) => state.orders);
  const { owner } = useWeb3();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchUserOrders(owner));
      setLoading(false);
    };
    init();
  }, [dispatch]);

  return (
    <BaseLayout loading={loading}>
      <div className="orderPage">
        {orders.map((order: IOrder, index: number) => (
          <div className="order" key={order._id}>
            <h2>
              Order {index} - {order.status}
            </h2>
            {!loading &&
              (order.orderItems.length > 0 ? (
                order.orderItems.map((item: ICartItem) => (
                  <div key={item._id}>
                    <p>
                      {item.name} - {item.quantity}
                    </p>
                  </div>
                ))
              ) : (
                <p>No orders</p>
              ))}
            <p>Order Total: {order.total}</p>
          </div>
        ))}
      </div>
    </BaseLayout>
  );
};

export default Orders;
