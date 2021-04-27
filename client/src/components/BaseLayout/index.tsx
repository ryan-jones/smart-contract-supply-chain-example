import React, { ReactElement } from "react";
import Navigation from "../Navigation";

interface Props {
  children: ReactElement;
}
const BaseLayout = (props: Props) => {
  return (
    <>
      <Navigation />
      {props.children}
    </>
  );
};

export default BaseLayout;
