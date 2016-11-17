import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import HereRightNow from './components/HereRightNow/HereRightNow';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="admin" component={Admin} />
      <Route path="currentPeople" component={HereRightNow} />
    </Route>
  </Router>,
  document.getElementById('container'),
);
