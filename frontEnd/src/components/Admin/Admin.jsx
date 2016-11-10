import * as React from 'react';
import * as axios from 'axios';

import AdminInfoWindow from './AdminInfoWindow';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminID: '',
      adminPass: '',
      adminData: {},
      signedIn: false,
      error: false,
      statusMessage: '',
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ adminID: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ adminPass: event.target.value });
  }

  handleSubmit() {
    axios.get(`http://localhost:3000/admins?username=${this.state.adminID}`)
            .then((getResponse) => {
              if (getResponse.data.length !== 1) {
                this.setState({ error: true, statusMessage: 'Could not find the admin' });
              } else {
                const admin = getResponse.data[0];
                this.setState({ adminData: admin, error: false, signedIn: true });
              }
            }).catch(() => {
              this.setState({ error: true, signedIn: false });
            });
  }

  render() {
    const signedIn = this.state.signedIn;
    const error = this.state.error;
    let infoDisplay = null;

    if (signedIn) {
      const adminData = this.state.adminData;
      infoDisplay = (<AdminInfoWindow admin={adminData} />);
    } else if (error) {
      const errorMessage = this.state.statusMessage;
      infoDisplay = <div>{errorMessage}</div>;
    }

    return (
      <div>
        <h1>Admin Sign In</h1>
        <input
          type="text"
          placeholder="Enter your username"
          value={this.state.username}
          onChange={this.handleChangeUsername}
          onSubmit={this.handleSubmit}
        />
        <br />
        <input
          type="text"
          placeholder="Enter your password"
          value={this.state.password}
          onChange={this.handleChangePassword}
          onSubmit={this.handleSubmit}
        />
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
        {infoDisplay}
      </div>
    );
  }
}

