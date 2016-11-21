import * as React from 'react';
import * as axios from 'axios';

export default class ResourceLog2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleResources: [],
    };
  }
  componentDidMount() {
    axios.get('http://localhost:3000/resources')
      .then(response => this.setState({ possibleResources: response.data }));
  }

  render() {
    return <div>hi</div>;
  }
}
