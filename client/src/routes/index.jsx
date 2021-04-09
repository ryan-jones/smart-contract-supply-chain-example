/** @format */

import React, { Suspense } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

const Inventory = React.lazy(() =>
  import(/* webpackChunkName: "Inventory" */ "../components/Inventory")
);

const Routes = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <Router>
        <Switch>
          <Route exact={true} path="/inventory" render={() => <Inventory />} />
          <Route
            exact={true}
            path="/"
            render={() => <Redirect to="/inventory" />}
          />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
