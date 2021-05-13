import React from "react";
import { IOption } from "src/interfaces/checkout";

const Select = ({ onChange, value, options }) => (
  <select onChange={onChange} value={value}>
    {options.map((option: IOption) => (
      <option key={option.value} value={option.value}>
        {option.name}
      </option>
    ))}
  </select>
);

export default Select;
