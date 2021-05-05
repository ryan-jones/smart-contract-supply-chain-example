/** @format */

import React from "react";
import { Link } from "react-router-dom";

import "./Navigation.scss";

const Navigation = () => {
  return (
    <nav>
      <h1>Supply Chain Distribution Management Example</h1>
      <div className="navLinks">
        <Link to="/shop">Shop</Link>
        <Link to="/inventory">Manage Inventory</Link>
      </div>
    </nav>
  );
};

export default Navigation;
