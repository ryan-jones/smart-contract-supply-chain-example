import React, { ReactNode } from "react";
import LoadingOverlay from "react-loading-overlay";

interface Props {
  active: boolean;
  children: ReactNode;
  text?: string;
}
const Loading = ({ children, active, text = "loading" }: Props) => {
  return (
    <LoadingOverlay
      active={active}
      spinner
      styles={{
        overlay: (base) => ({
          ...base,
          background: "rgba(255, 255, 255, 0.7)",
        }),
        content: (base) => ({
          ...base,
          color: "rgba(3,20,47,1)",
          fontSize: 12,
          fontFamily: "Quicksand, sans-serif",
        }),
        spinner: (base) => ({
          ...base,
          width: "24px",
          "& svg circle": {
            stroke: "rgba(0,103,255,1)",
            strokeWidth: 6,
          },
        }),
      }}
      text={text}
    >
      {children}
    </LoadingOverlay>
  );
};

export default Loading;
