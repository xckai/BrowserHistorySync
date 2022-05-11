import React, { lazy, Suspense } from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.less";
export class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Suspense
          fallback={
          <></>
          }
        >
          <Switch>
            <Route
              path="/popup"
              component={lazy(() => import("./Pages/Popup/Index"))}
            />
            <Route
              path="/homepage"
              component={lazy(() => import("./Pages/Homepage/Index"))}
            />
            <Route
              path="/mobile"
              component={lazy(() => import("./Pages/Mobile/Index"))}
            />
            <Route
              path="*"
              component={lazy(() => import("./Pages/Homepage/Index"))}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}
export default App;
