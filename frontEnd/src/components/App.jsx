import * as React from 'react';
import { IndexLink, Link } from 'react-router';

function App(props) {
  return (
    <div>
      <ul className="header">
        <li><IndexLink to="/">Home</IndexLink></li>
        <li><Link to="admin">Admin</Link></li>
        <li><Link to="currentPeople">View People Here Right Now</Link></li>
      </ul>
      <div className="content">
        { props.children }
      </div>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
