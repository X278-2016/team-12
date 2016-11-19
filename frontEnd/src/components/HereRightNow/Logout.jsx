import * as React from 'react';
import * as axios from 'axios';
import ResourceLog from './ResourceLog';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      error: false,
      statusMessage: '',
      showResourceLog: false,
      resources: [],
    };
    this.handleClick = this.startLogoutProcess.bind(this);
    this.addResources = this.addResources.bind(this);
    this.startLogoutProcess = this.startLogoutProcess.bind(this);
    this.finishLogoutProcess = this.finishLogoutProcess.bind(this);
  }

  startLogoutProcess() {
    this.setState({ showResourceLog: !this.state.showResourceLog });
  }
  finishLogoutProcess() {
    // finish logout by recording resource usage and marking user as signed out
    axios.patch(`http://localhost:3000/users/${this.props.user.id}`, {
      signedIn: false,
      // change resorucesUsed to reflect the proper quantity
      useLog: {
        date: Date.now(),
        machinesUsed: this.props.user.approvedFor.map(machine => machine.id),
        resourcesUsed: this.state.resources.map(resource =>
          ({ id: resource.id, quantity: '15 grams' })),
      },
    })
    // after sending request to server, tell the list of users
    // that we've signed out the user by calling logoutFunction
    .then(() => this.props.logoutFunction(this.props.user))
    .catch(() => this.setState({
      error: true,
      statusMessage: `Could not sign out ${this.props.user.fullName}`,
    }));
  }

  addResources(usedResources) {
    this.setState({ resources: usedResources });
  }

  render() {
    if (!this.state.showResourceLog) {
      return <button onClick={this.startLogoutProcess}>Sign out</button>;
    }
    return (
      <ResourceLog
        addResources={this.addResources}
        finishLogoutProcess={this.finishLogoutProcess}
        resources={this.state.resources}
      />
    );
  }
}

Logout.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    fullName: React.PropTypes.string,
    approvedFor: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
    })),
  }),
  logoutFunction: React.PropTypes.func,
};
