import * as React from 'react';
import * as axios from 'axios';

import UserInfoWindow from '../Home/UserInfoWindow';
import UserEntry from './UserEntry';

export default class HereRightNow extends React.Component {
  static filterBySignedIn(users) {
    const signedIn = [];
    users.forEach((user) => {
      if (user.signedIn) {
        signedIn.push(user);
      }
    });
    return signedIn;
  }

  constructor(props) {
    super(props);
    this.state = {
      usersHere: [],
      userToDisplay: {},
    };
    this.handleChildClick = this.handleChildClick.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/users')
        .then((response) => {
          const users = response.data;
          this.setState({usersHere: HereRightNow.filterBySignedIn(users)});
        });
  }

  handleChildClick(user) {
    this.setState({ userToDisplay: user });
  }

  render() {
    const usersHere = this.state.usersHere;
    let userButtons = null;
    if (usersHere.length > 0) {
      userButtons = usersHere.map((user, index) =>
        <li key={index}><UserEntry user={user} onClick={this.handleChildClick} /></li>
      );
    } else {
      userButtons = <div>No one here</div>;
    }
    let infoWindow = null;
    if (this.state.userToDisplay.fullName) {
      infoWindow = <UserInfoWindow user={this.state.userToDisplay} />;
    } else {
      infoWindow = <div>No user selected</div>;
    }
    return (
      <div>
        <h1>People Here Right Now</h1>
        <ul>{userButtons}</ul>
        <h3>User Info</h3>
        {infoWindow}
      </div>
    );
  }
}
