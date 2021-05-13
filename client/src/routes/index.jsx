import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "src/store";

const Inventory = React.lazy(() =>
  import(/* webpackChunkName: "Inventory" */ "../pages/Inventory")
);

const Shop = React.lazy(() =>
  import(/* webpackChunkName: "Shop" */ "../pages/Shop")
);
const Checkout = React.lazy(() =>
  import(/* webpackChunkName: "Checkout" */ "../pages/Checkout")
);

const Orders = React.lazy(() =>
  import(/* webpackChunkNsme: "Orders" */ "../pages/Orders")
);

const OrderConfirmation = React.lazy(() =>
  import(
    /* webpackChunkName: "OrderConfirmation" */ "../pages/OrderConfirmation"
  )
);

const Routes = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact={true} path="/inventory" render={() => <Inventory />} />
          <Route exact={true} path="/shop" render={() => <Shop />} />
          <Route exact={true} path="/checkout" render={() => <Checkout />} />
          <Route
            exact={true}
            path="/orders/confirmation"
            render={() => <OrderConfirmation />}
          />
          <Route exact={true} path="/orders" render={() => <Orders />} />
          <Route
            exact={true}
            path="/"
            render={() => <Redirect to="/inventory" />}
          />
        </Switch>
      </ConnectedRouter>
    </Suspense>
  );
};

export default Routes;
