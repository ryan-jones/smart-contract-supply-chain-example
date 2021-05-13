import React, { useEffect, useCallback, useState } from "react";
import { ICartItem } from "src/interfaces/inventory";
import { IOrderResponse } from "src/interfaces/orders";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import useWeb3 from "src/hooks/useWeb3";
import { createNewOrder } from "src/store/actions/orders";
import {
  fetchShoppingCart,
  removeFromShoppingCart,
  updateShoppingCart,
} from "src/store/actions/shoppingCart";

import BaseLayout from "src/components/BaseLayout";
import { DeleteButton, SubmitButton } from "src/components/Forms/FormButtons";
import Select from "src/components/Forms/Select";
import { Total, SubTotal } from "./Totals";
import { aggregate } from "src/utils/calc";
import { createOrderAddress } from "src/utils/orderManager";

const ShoppingCartPage = () => {
  const { owner, orderManager } = useWeb3();
  const dispatch = useAppDispatch();
  const { items }: { items: ICartItem[] } = useAppSelector(
    (state) => state.shoppingCart
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchShoppingCart());
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const total: number = aggregate(items);
      const order: IOrderResponse = await createOrderAddress(
        orderManager,
        owner,
        total
      );
      await dispatch(
        createNewOrder({
          ...order,
          orderItems: items.map((item: ICartItem) => ({
            _id: item._id,
            quantity: item.quantity,
            amount: item.amount,
            price: item.price,
          })),
        })
      );
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const updateFieldValue = useCallback(
    (quantity: number, item: ICartItem) => {
      dispatch(
        updateShoppingCart({
          ...item,
          quantity,
        })
      );
    },
    [dispatch]
  );

  return (
    <BaseLayout loading={loading}>
      <div>
        <form className="cart" onSubmit={onSubmit}>
          {items.map((field: ICartItem) => {
            return (
              <div key={field._id} className="cart__listItem">
                <div className="cart__line">
                  {field.name}
                  <DeleteButton
                    onClick={() => dispatch(removeFromShoppingCart(field))}
                  >
                    remove item
                  </DeleteButton>
                </div>
                <div className="cart__line">
                  <span>{field.price} wei</span>
                  <span> X </span>
                  <Select
                    value={field.quantity}
                    onChange={(e) => updateFieldValue(e.target.value, field)}
                    options={Array.from(
                      { length: field.amount },
                      (_, num: number) => ({ name: num + 1, value: num + 1 })
                    )}
                  />
                  <span> = </span>
                  <SubTotal price={field.price} quantity={field.quantity} />
                </div>
              </div>
            );
          })}

          <Total items={items} />

          <SubmitButton disabled={!items.length}>Place order</SubmitButton>
        </form>
      </div>
    </BaseLayout>
  );
};

export default ShoppingCartPage;
