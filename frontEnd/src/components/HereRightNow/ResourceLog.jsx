import * as React from 'react';
import * as axios from 'axios';

export default class ResourceLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleResources: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    axios.get('http://localhost:3000/resources')
      .then((response) => { this.setState({ possibleResources: response.data }); });
  }

  handleSubmit() {
    const resourcesUsed = [{
      id: 1,
      quantity: 10,
    }];
    this.props.finishLogout(resourcesUsed);
  }

  render() {
    const resourceList = this.state.possibleResources.map(resource =>
      <div>
        <input
          key={resource.id}
          type="text"
          placeholder={resource.name}
        />
        {resource.units}
      </div>,
    );
    return (
      <div>
        {resourceList}
        <button onClick={this.handleSubmit}>Finish</button>
      </div>
    );
  }
}

ResourceLog.propTypes = {
  finishLogout: React.PropTypes.func.isRequired,
};
