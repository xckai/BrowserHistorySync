import React, { lazy, Suspense } from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import _ from "lodash";
export class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Suspense
          fallback={
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "10rem",
                fontSize: "18px",
                fontFamily: "sans-serif",
              }}
            >
              Loading...
            </div>
          }
        >
          <Switch>
            <Route
              path="/summary"
              component={lazy(() => import("./Pages/Popup"))}
            />
            <Route
              path="/homepage"
              component={lazy(() => import("./Pages/Homepage"))}
            />
            <Route
              path="/page3"
              component={lazy(() => import("./Pages/Page3"))}
            />
            <Route path="*" component={lazy(() => import("./Pages/Popup"))} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}
export default App;
