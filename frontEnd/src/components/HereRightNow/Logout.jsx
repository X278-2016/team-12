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
    };
    this.startLogoutProcess = this.startLogoutProcess.bind(this);
    this.finishLogoutProcess = this.finishLogoutProcess.bind(this);
  }

  startLogoutProcess() {
    this.setState({ showResourceLog: !this.state.showResourceLog });
  }
  finishLogoutProcess(usedResources) {
    // finish logout by recording resource usage and marking user as signed out
    axios.patch(`http://localhost:3000/users/${this.props.user.id}`, {
      signedIn: false,
      useLog: this.props.user.useLog.concat([{
        date: Date.now(),
        machinesUsed: [1],
        resourcesUsed: usedResources,
      }]),
    })
    // after sending request to server, tell the list of users
    // that we've signed out the user by calling logoutFunction
    .then(() => this.props.logoutFunction(this.props.user))
    .catch(() => this.setState({
      error: true,
      statusMessage: `Could not sign out ${this.props.user.fullName}`,
    }));
  }

  render() {
    if (!this.state.showResourceLog) {
      return <button onClick={this.startLogoutProcess}>Sign out</button>;
    }
    return (
      <div>
        <ResourceLog finishLogout={this.finishLogoutProcess} />
      </div>
    );
  }
}

Logout.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    fullName: React.PropTypes.string.isRequired,
    approvedFor: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
    })),
    useLog: React.PropTypes.array(React.PropTypes.shape({
      date: React.PropTypes.number,
      machinesUsed: React.PropTypes.arrayOf(React.PropTypes.number),
      resourcesUsed: React.PropTypes.shape(React.PropTypes.shape({
        id: React.PropTypes.number,
        quantity: React.PropTypes.number,
      })),
    })),
  }),
  logoutFunction: React.PropTypes.func.isRequired,
};
