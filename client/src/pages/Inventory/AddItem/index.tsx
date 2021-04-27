import React from "react";
import { useForm } from "react-hook-form";
import { Item } from "src/interfaces/inventory";
import Input from "src/components/Forms/Input";
import { SubmitButton } from "src/components/Forms/FormButtons";
import "./AddItem.css";

interface IFormItem extends Item {
  qty: number;
}
interface IAddItem {
  onSubmit: (item: IFormItem) => void;
}

const AddItem = ({ onSubmit }: IAddItem) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormItem>();

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
          error={errors.qty && "This field is required"}
        />
      </div>
      <SubmitButton disabled={false}>Add Item</SubmitButton>
    </form>
  );
};

export default AddItem;
