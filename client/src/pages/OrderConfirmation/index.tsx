import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ICartItem } from "src/interfaces/inventory";
import { IOrder } from "src/interfaces/orders";
import BaseLayout from "src/components/BaseLayout";
import Button from "src/components/Button";
import { useAppDispatch } from "src/hooks/useRedux";
import { fetchOrder } from "src/api";
import useWeb3 from "src/hooks/useWeb3";

export const OrderConfirmationPage = () => {
  const { owner } = useWeb3();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<IOrder | null>(null);

  const getOrderDetails = useCallback(async (orderId: string) => {
    setLoading(true);
    const orderRes: IOrder = await fetchOrder(owner, orderId);
    setOrder(orderRes);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!location.state?.order) {
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get("order");
      if (orderId) {
        getOrderDetails(orderId);
      } else {
        setNotFound(true);
      }
    } else {
      setOrder(location.state.order);
    }
  }, [getOrderDetails, setNotFound, setOrder]);

  return notFound ? (
    <BaseLayout>
      <p>Order not found</p>
    </BaseLayout>
  ) : (
    <BaseLayout loading={loading}>
      <div>
        <h1>Order successfully submitted</h1>
        <h2>Transfer funds to complete order</h2>
        {order &&
          order.orderItems.map((item: ICartItem) => (
            <div>
              <p>{item.name}</p>
              <p>
                Qty: {item.quantity} x {item.price} ={" "}
                {item.quantity * item.price}
              </p>
            </div>
          ))}
        Order Total:{order?.total}
        <Link to="/orders">Manage orders</Link>
        <Button disabled={false} onClick={() => {}}>
          Complete payment
        </Button>
      </div>
    </BaseLayout>
  );
};

export default OrderConfirmationPage;
