import * as React from 'react';
import { IndexLink } from 'react-router';

function App(props) {
  return (
    <div>
      <h1>Simple SPA</h1>
      <ul className="header">
        <li><IndexLink to="/">Home</IndexLink></li>
      </ul>
      <div className="content">
        { props.children }
      </div>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.string.isRequired,
};

export default App;
