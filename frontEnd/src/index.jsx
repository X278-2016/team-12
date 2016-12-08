import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import AdminPanel from './components/Admin/AdminPanel';
import HereRightNow from './components/HereRightNow/HereRightNow';

// Render the React Router within the `container` element in `index.html`.
// history={browserHistory} is used to keep the URL and history in sync with our application,
// since this normally would not occur (as technically everything happens on index.html)
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="admin" component={Admin} />
      <Route path="adminPanel" component={AdminPanel} />
      <Route path="currentPeople" component={HereRightNow} />
    </Route>
  </Router>,
  document.getElementById('container'),
);
