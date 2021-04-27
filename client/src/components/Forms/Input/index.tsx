import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import "./Input.css";

interface Props {
  id: string;
  type: string;
  label?: string;
  error?: string;
  defaultValue?: string | number;
  registeredValue: UseFormRegisterReturn;
  width?: string | number;
}
const Input = ({
  id,
  type,
  registeredValue,
  label,
  error,
  defaultValue,
  width = "100%",
}: Props) => (
  <div className="inputContainer">
    {label && <label htmlFor={id}>{label}</label>}
    <input
      style={{ width }}
      {...registeredValue}
      id={id}
      type={type}
      defaultValue={defaultValue}
    />
    {error && <span>{error}</span>}
  </div>
);

export default Input;
