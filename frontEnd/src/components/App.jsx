import * as React from 'react';
import { IndexLink } from 'react-router';

export default function App() {
  return (
    <div>
      <h1>Simple SPA</h1>
      <ul className="header">
        <li><IndexLink to="/">Home</IndexLink></li>
      </ul>
      <div className="content">
        { this.props.children }
      </div>
    </div>
  );
}
