import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import differenceBy from "lodash/differenceBy";

import { Item } from "src/interfaces/inventory";
import Select from "src/components/Forms/Select";
import { SubmitButton, DeleteButton } from "src/components/Forms/FormButtons";
import { ICartItem } from "..";
import { Total, SubTotal } from "./Totals";
import "./ShoppingCart.css";

interface IProps {
  selectedItems: ICartItem[];
  removeFromCart: (item: ICartItem) => void;
}

export type FormValues = {
  cart: ICartItem[];
};

const ShoppingCart = ({ selectedItems, removeFromCart }: IProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      cart: selectedItems.map((item: Item) => ({ ...item, quantity: 1 })),
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control,
  });

  const onSubmit = (checkoutItems: FormValues) => {
    console.log("onSubmit", checkoutItems);
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
