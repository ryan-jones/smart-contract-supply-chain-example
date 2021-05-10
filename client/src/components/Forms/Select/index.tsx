import React from "react";
import { UseFormRegister } from "react-hook-form";

type IOption = {
  name: string | number;
  value: string | number;
};
const Select = React.forwardRef<
  HTMLSelectElement,
  { label?: string; options: IOption[]; id: string } & ReturnType<
    UseFormRegister<any>
  >
>(({ onChange, onBlur, name, label, options, id }, ref) => (
  <>
    {label && <label>{label}</label>}
    <select id={id} name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  </>
));

export default Select;
