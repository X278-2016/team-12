import * as React from 'react';
import { IndexLink, Link } from 'react-router';

// This is the main application--it's a navbar at the top
// and a container for whatever page (component) is currently selected
function App(props) {
  return (
    <div>
      <div>
        <ul className="nav navbar-nav">
          <li><IndexLink to="/">Home</IndexLink></li>
          <li><Link to="admin">Admin</Link></li>
          <li><Link to="currentPeople">View People Here Right Now</Link></li>
        </ul>
      </div>
      <br />
      <br />
      <div className="container">
        <div className="col-md-6 centered">
          {props.children}
        </div>
      </div>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
