import * as React from 'react';
import * as axios from 'axios';

export default class MachinesCanUse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allMachines: [],
      highlightedMachines: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/equipment')
      .then((response) => {
        const equipment = response.data;
        this.setState({ allMachines: equipment });
        const approvedMachines = this.props.user.approvedFor;
        this.state.allMachines.forEach((machine, index) => {
          const style = {
            color: 'red',
          };
          if (approvedMachines.findIndex(approvedMachine =>
              approvedMachine.id === machine.id) !== -1) {
            style.color = 'green';
          }
          const machineElement = <li style={style} key={index}>{machine.name}</li>;
          this.setState({ highlightedMachines:
            this.state.highlightedMachines.concat([machineElement]) });
        });
      });
  }

  render() {
    return (
      <div><ul>{this.state.highlightedMachines}</ul></div>
    );
  }
}

MachinesCanUse.propTypes = {
  user: React.PropTypes.shape({
    approvedFor: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
      }),
    ),
  }),
};
