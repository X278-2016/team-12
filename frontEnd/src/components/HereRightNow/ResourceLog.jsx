import * as React from 'react';
import * as axios from 'axios';

export default class ResourceLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleResources: [],
      usedResources: {},
      possibleMachines: [],
      usedMachines: {},
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
    axios.get('http://localhost:3000/equipment')
      .then((response) => {
        const equipment = response.data;
        this.setState({ possibleMachines: equipment });
        const newMachines = {};
        equipment.forEach((machine) => {
          const machineId = Number.parseInt(machine.id, 10);
          newMachines[machineId] = false;
        });
        this.setState({ usedMachines: newMachines });
      });
  }

  handleSubmit() {
    this.props.finishLogout(this.state.usedResources, this.state.usedMachines);
  }

  handleChange(event) {
    const target = event.target;
    if (target.dataset.resourceid) {
      // modifying resources
      const key = Number.parseInt(target.dataset.resourceid, 10);
      const value = Number.parseInt(target.value, 10);
      const modififedResource = {
        [key]: value,
      };
      this.setState({ usedResources:
        Object.assign({}, this.state.usedResources, modififedResource) });
    } else {
      // modifying Machines
      const key = Number.parseInt(target.dataset.machineid, 10);
      const value = target.value === 'on';
      const modifiedMachine = {
        [key]: value,
      };
      this.setState({ usedMachines:
        Object.assign({}, this.state.usedMachines, modifiedMachine) });
    }
  }

  render() {
    const machineList = this.state.possibleMachines.map(machine =>
      (<div key={machine.id}>
        {machine.name}:
        <input
          type="checkbox"
          data-machineid={machine.id}
          onChange={this.handleChange}
        />
      </div>));
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
        <h2>Logout</h2>
        <h3>Machines used</h3>
        {machineList}
        <h3>Resources used</h3>
        {resourceList}
        <button
          onClick={this.handleSubmit}
          className="btn btn-success"
        >Finish</button>
      </div>
    );
  }
}

ResourceLog.propTypes = {
  finishLogout: React.PropTypes.func.isRequired,
};
