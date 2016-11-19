import * as React from 'react';
import * as axios from 'axios';

export default class ResourceLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleResources: [],
      usedResources: [],
      error: false,
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/resources')
      .then((response) => {
        this.setState({ possibleResources: response.data });
        // placeholder, for now until you can record resource usage
        this.props.addResources(response.data);
      })
      .catch(() => this.setState({ error: true }));
  }

  render() {
    let resourceList = null;
    if (this.state.possibleResources.length > 0) {
      resourceList = this.state.possibleResources.map(resource =>
        <li key={resource.id}>{resource.name}</li>);
    }
    return (
      <div>
        <h2>Before logout, record resources used</h2>
        <ul>
          {resourceList}
        </ul>
        <button onClick={this.props.finishLogoutProcess}>Finish logout</button>
      </div>
    );
  }
}

ResourceLog.propTypes = {
  addResources: React.PropTypes.func.isRequired,
  finishLogoutProcess: React.PropTypes.func.isRequired,
};
