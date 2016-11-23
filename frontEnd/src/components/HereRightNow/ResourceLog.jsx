import * as React from 'react';
import * as axios from 'axios';

export default class ResourceLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleResources: [],
      usedResources: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputs = [];
  }
  componentDidMount() {
    axios.get('http://localhost:3000/resources')
      .then((response) => {
        const resources = response.data;
        this.setState({ possibleResources: resources });
        // TODO: see notepad++ code and move ref stuff here to update this.state.usedResources
        const newResources = {};
        resources.forEach((resource) => {
          const newResource = {
            id: Number.parseInt(resource.id, 10),
            quantity: 0,
          };
          newResources[newResource.id] = newResource;
        });
        this.setState({ usedResources: newResources });
      });
  }

  handleSubmit() {
    this.props.finishLogout(this.state.usedResources);
  }

  handleChange(event) {
    const target = event.target;
    const key = Number.parseInt(target.dataset.resourceid, 10);
    const value = Number.parseInt(target.value, 10);
    const modififedResource = {
      [key]: value,
    };
    this.setState({ usedResources:
      Object.assign({}, this.state.usedResources, modififedResource) });
  }

  render() {
    const resourceList = this.state.possibleResources.map(resource =>
      (<div key={resource.id}>
        {resource.name}:
        <input
          type="text"
          data-resourceid={resource.id}
          onChange={this.handleChange}
        />
        {resource.units}
      </div>));
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
