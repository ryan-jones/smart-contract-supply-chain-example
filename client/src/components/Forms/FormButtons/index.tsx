import React from "react";
import Button from "../../Button";
import "./FormButtons.scss";

export const SubmitButton = ({ children, disabled }) => {
  return (
    <Button classes="submitBtn" disabled={disabled} type="submit">
      {children}
    </Button>
  );
};

export const DeleteButton = ({ children, onClick }) => {
  return (
    <Button
      classes="deleteBtn"
      disabled={false}
      type="button"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
