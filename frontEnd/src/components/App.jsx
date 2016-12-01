import * as React from 'react';
import { IndexLink, Link } from 'react-router';

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
        <br/>
        <br/>
        <div className="container">
            <div class="col-lg-1 col-offset-6 centered">
                { props.children }
            </div>
        </div>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
