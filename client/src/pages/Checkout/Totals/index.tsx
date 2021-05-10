import React from "react";
import { useWatch, Control } from "react-hook-form";
import { FormValues } from "..";

export const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: "cart",
    control,
  });
  const total = formValues.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0
  );
  return <p>Total Amount: {total}</p>;
};

export const SubTotal = ({
  control,
  index,
}: {
  control: Control<FormValues>;
  index: number;
}) => {
  const formValues = useWatch({ name: "cart", control });
  return (
    <span>
      {(formValues[index].price || 0) * (formValues[index].quantity || 0)}
    </span>
  );
};
