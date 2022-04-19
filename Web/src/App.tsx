import React, { lazy, Suspense } from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import "./Static/CSS/App.less";
export class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/summary" component={lazy(() => import('./Pages/Summary'))} />
            <Route path="/homepage" component={lazy(() => import('./Pages/Homepage'))} />
            <Route path="/page3" component={lazy(() => import('./Pages/Page3'))} />
            <Route path="*" component={lazy(() => import('./Pages/Summary'))} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}
export default App;
