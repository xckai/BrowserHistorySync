import React, { lazy, Suspense } from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.less";
const HomePage = React.lazy(() => import("./Pages/Homepage/Index"));
const Mobile = React.lazy(() => import("./Pages/Mobile/Index"));
const PopupPage = React.lazy(() => import("./Pages/Popup/Index"));
const AdminPage = React.lazy(() => import("./Pages/Admin/Index"));
export class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<></>}>
                <HomePage />
              </Suspense>
            }
          ></Route>
          <Route
            path="/popup"
            element={
              <Suspense fallback={<></>}>
                <PopupPage />
              </Suspense>
            }
          />
          <Route
            path="/homepage"
            element={
              <Suspense fallback={<></>}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/mobile"
            element={
              <Suspense fallback={<></>}>
                <Mobile />
              </Suspense>
            }
          />
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<></>}>
                <AdminPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
