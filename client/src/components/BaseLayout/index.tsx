import React, { ReactElement } from "react";
import LoadingOverlay from "../LoadingOverlay";
import Navigation from "../Navigation";

interface Props {
  children: ReactElement;
  loading?: boolean;
}
const BaseLayout = ({ children, loading = false }: Props) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navigation />
      <LoadingOverlay active={loading}>{children}</LoadingOverlay>
    </div>
  );
};

export default BaseLayout;
