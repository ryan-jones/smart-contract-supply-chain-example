import React, { ReactNode } from "react";
import "./Button.scss";

interface Props {
  children: ReactNode;
  disabled: boolean;
  classes?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}
const Button = ({
  type = "button",
  disabled,
  onClick,
  children,
  classes,
}: Props) => {
  return (
    <button
      className={classes}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
