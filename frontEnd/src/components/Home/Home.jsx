import * as React from 'react';
import * as axios from 'axios';

import UserInfoWindow from './UserInfoWindow';

// Home page for signing in users.
// Each time a user is signed in successfully, we'll display information about them
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      userData: {},
      signedIn: false,
      error: false,
      statusMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ userID: event.target.value });
  }

  handleSubmit() {
    axios.get(`http://localhost:3000/users?vunetID=${this.state.userID}`)
      .then((getResponse) => {
        if (getResponse.data.length !== 1) {
          this.setState({ error: true, statusMessage: 'Could not find the user' });
        } else {
          const user = getResponse.data[0];
          this.setState({ userData: user, error: false });
          axios.patch(`http://localhost:3000/users/${user.id}`, {
            signedIn: true,
          })
          .then(() => {
            this.setState({ signedIn: true });
          });
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
      const userData = this.state.userData;
      infoDisplay = (<UserInfoWindow user={userData} />);
    } else if (error) {
      const errorMessage = this.state.statusMessage;
      infoDisplay = <div>{errorMessage}</div>;
    }

    return (
      <div>
        <h1>Sign In</h1>
        <input
          type="text"
          placeholder="Enter a username"
          value={this.state.userID}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <button
          onClick={this.handleSubmit}
          className="btn btn-success"
        >Submit</button>
        {infoDisplay}
      </div>
    );
  }
}
