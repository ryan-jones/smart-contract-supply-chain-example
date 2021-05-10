import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { ICartItem, Item } from "src/interfaces/inventory";
import differenceBy from "lodash/differenceBy";

import BaseLayout from "src/components/BaseLayout";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import useWeb3 from "src/hooks/useWeb3";
import { createNewOrder } from "src/store/actions/orders";
import {
  fetchShoppingCart,
  removeFromShoppingCart,
} from "src/store/actions/shoppingCart";
import { Total, SubTotal } from "./Totals";
import { DeleteButton, SubmitButton } from "src/components/Forms/FormButtons";
import Select from "src/components/Forms/Select";

export type FormValues = {
  cart: ICartItem[];
};

type IStatus = "created" | "paid" | "delivered";
const STATUS: IStatus[] = ["created", "paid", "delivered"];

const ShoppingCartPage = () => {
  const { owner, orderManager } = useWeb3();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.shoppingCart);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      cart: items,
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control,
  });

  const onSubmit = async (checkoutItems: FormValues) => {
    const total = checkoutItems.cart.reduce(
      (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
      0
    );
    try {
      const orderResponse = await orderManager.methods
        .createOrder(new Date().toISOString(), total)
        .send({ from: owner });

      const order = {
        owner,
        total,
        recipientAddress: orderResponse.events.SupplyChainStep.address,
        orderAddress:
          orderResponse.events.SupplyChainStep.returnValues._itemAddress,
        status: STATUS[orderResponse.events.SupplyChainStep.returnValues._step],
      };
      dispatch(
        createNewOrder({
          ...order,
          orderItems: checkoutItems.cart.map((item: ICartItem) => ({
            _id: item._id,
            quantity: item.quantity,
            amount: item.amount,
          })),
        })
      );
      return (
        <Redirect
          to={{
            pathname: "/orders/confirmation",
            state: {
              order: {
                ...order,
                orderItems: checkoutItems.cart,
              },
            },
          }}
        />
      );
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    dispatch(fetchShoppingCart());
  }, [dispatch, items]);

  useEffect(() => {
    if (items.length > fields.length) {
      append(differenceBy(items, fields, "_id"));
    } else {
      remove(differenceBy(items, fields, "_id"));
    }
  }, [items]);

  return (
    <BaseLayout>
      <div>
        <form className="cart" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="cart__listItem">
                <div className="cart__line">
                  {field.name}
                  <DeleteButton
                    onClick={() => {
                      dispatch(removeFromShoppingCart(field));
                      remove(index);
                    }}
                  >
                    remove item
                  </DeleteButton>
                </div>
                <div className="cart__line">
                  <span>{field.price} wei</span>
                  <span> X </span>
                  <Select
                    key={field.id}
                    id={field.id}
                    {...register(`cart.${index}.quantity` as const, {
                      valueAsNumber: true,
                      required: true,
                      max: field.amount,
                    })}
                    options={Array.from(
                      { length: field.amount },
                      (_, num: number) => ({ name: num + 1, value: num + 1 })
                    )}
                  />
                  <span> = </span>
                  <SubTotal control={control} index={index} />
                </div>
              </div>
            );
          })}

          <Total control={control} />

          <SubmitButton disabled={errors.cart && errors.cart.length >= 1}>
            Place order
          </SubmitButton>
        </form>
      </div>
    </BaseLayout>
  );
};

export default ShoppingCartPage;
