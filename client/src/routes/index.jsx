import React, { Suspense } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

const Inventory = React.lazy(() =>
  import(/* webpackChunkName: "Inventory" */ "../pages/Inventory")
);

const Shop = React.lazy(() =>
  import(/* webpackChunkName: "Shop" */ "../pages/Shop")
);

const Routes = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <Router>
        <Switch>
          <Route exact={true} path="/inventory" render={() => <Inventory />} />
          <Route exact={true} path="/shop" render={() => <Shop />} />
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
