import * as React from 'react';
import * as axios from 'axios';
import md5 from 'md5';

import UserInfoWindow from '../Home/UserInfoWindow';
import UserEntry from './UserEntry';
import MachinesCanUse from '../Home/MachinesCanUse';
import Certifications from './Certifications';
import Logout from './Logout';

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
    this.handleUserButtonClick = this.handleUserButtonClick.bind(this);
    this.handleUserSignOut = this.handleUserSignOut.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/users')
        .then((response) => {
          const users = response.data;
          this.setState({ usersHere: HereRightNow.filterBySignedIn(users) });
        });
  }

  handleUserButtonClick(user) {
    this.setState({ userToDisplay: user });
  }

  handleUserSignOut(signedOutUser) {
    this.setState({
      usersHere: this.state.usersHere.filter(user => user.id !== signedOutUser.id),
      userToDisplay: {},
    });
  }

  render() {
    const usersHere = this.state.usersHere;
    let userButtons = null;
    if (usersHere.length > 0) {
      userButtons = usersHere.map((user, index) =>
        <li key={index}><UserEntry user={user} onClick={this.handleUserButtonClick} /></li>,
      );
    } else {
      userButtons = <div>No one here</div>;
    }

    let userWindow = null;
    if (this.state.userToDisplay && this.state.userToDisplay.fullName) {
      const md5email = md5(this.state.userToDisplay.email);
      userWindow = (<div>
        <h3>User Info</h3>
        <img src={`http://gravatar.com/avatar/${md5email}`} alt="gravatar" />
        <UserInfoWindow user={this.state.userToDisplay} />
        <h3>Machine Privileges</h3>
        <MachinesCanUse user={this.state.userToDisplay} />
        <h3>Certifications</h3>
        <Certifications user={this.state.userToDisplay} />
        <Logout
          user={this.state.userToDisplay}
          logoutFunction={this.handleUserSignOut}
        />
      </div>);
    } else {
      userWindow = <div>No user selected</div>;
    }
    return (
      <div>
        <h1>People Here Right Now</h1>
        <ul>{userButtons}</ul>
        {userWindow}
      </div>
    );
  }
}
