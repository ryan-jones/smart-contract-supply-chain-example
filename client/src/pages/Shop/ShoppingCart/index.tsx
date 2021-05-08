import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import differenceBy from "lodash/differenceBy";

import { ICartItem, Item } from "src/interfaces/inventory";
import useWeb3 from "src/hooks/useWeb3";
import Select from "src/components/Forms/Select";
import { SubmitButton, DeleteButton } from "src/components/Forms/FormButtons";
import { Total, SubTotal } from "./Totals";
import "./ShoppingCart.scss";
import { createOrder } from "src/api";

interface IProps {
  selectedItems: ICartItem[];
  removeFromCart: (item: ICartItem) => void;
}

export type FormValues = {
  cart: ICartItem[];
};

type IStatus = "created" | "paid" | "delivered";
const STATUS: IStatus[] = ["created", "paid", "delivered"];

const ShoppingCart = ({ selectedItems, removeFromCart }: IProps) => {
  const { owner, orderManager } = useWeb3();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      cart: selectedItems.map((item: Item) => ({
        ...item,
        quantity: 1,
      })),
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
      const order = await orderManager.methods
        .createOrder(new Date().toISOString(), total)
        .send({ from: owner });
      await createOrder({
        owner,
        total,
        recipientAddress: order.events.SupplyChainStep.address,
        orderAddress: order.events.SupplyChainStep.returnValues._itemAddress,
        status: STATUS[order.events.SupplyChainStep.returnValues._step],
        orderItems: checkoutItems.cart.map((item: ICartItem) => ({
          _id: item._id,
          quantity: item.quantity,
          amount: item.amount,
        })),
      });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    differenceBy(selectedItems, fields, "_id").forEach(
      (item: ICartItem, idx: number) => {
        selectedItems.length > fields.length ? append(item) : remove(idx);
      }
    );
  }, [selectedItems]);

  return (
    <form className="cart" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="cart__listItem">
            <div className="cart__line">
              {field.name}
              <DeleteButton
                onClick={() => {
                  removeFromCart(field);
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
  );
};

export default ShoppingCart;
