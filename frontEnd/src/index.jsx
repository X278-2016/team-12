import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from './components/App';
import { UserInput } from './components/UserInput';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={UserInput} />
    </Route>
  </Router>,
  document.getElementById('container')
);
