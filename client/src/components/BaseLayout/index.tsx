import React, { ReactElement } from "react";
import Navigation from "../Navigation";

interface Props {
  children: ReactElement;
}
const BaseLayout = (props: Props) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navigation />
      {props.children}
    </div>
  );
};

export default BaseLayout;
