import React from "react";
import { useForm } from "react-hook-form";
import { IFormItem } from "src/interfaces/inventory";
import { useAppDispatch } from "src/hooks/useRedux";
import { createNewItem } from "src/store/actions/inventory";
import Input from "src/components/Forms/Input";
import { SubmitButton } from "src/components/Forms/FormButtons";

import "./AddItem.scss";

const AddItem = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormItem>();

  const onSubmit = async (item: IFormItem) => {
    dispatch(createNewItem(item));
  };

  return (
    <form className="addItem" onSubmit={handleSubmit(onSubmit)}>
      <div className="addItem__listItem">
        <Input
          id="itemName"
          type="text"
          label="Name:"
          registeredValue={register("name", { required: true })}
          error={errors.name && "This field is required"}
        />
        <Input
          id="price"
          type="number"
          label="Price (in wei):"
          registeredValue={register("price", { required: true })}
          error={errors.price && "This field is required"}
        />
        <Input
          id="qty"
          type="number"
          label="Quantity:"
          registeredValue={register("amount", { required: true })}
          error={errors.quantity && "This field is required"}
        />
      </div>
      <SubmitButton disabled={false}>Add Item</SubmitButton>
    </form>
  );
};

export default AddItem;
