import * as React from 'react';
import * as axios from 'axios';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      error: false,
      statusMessage: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    axios.patch(`http://localhost:3000/users/${this.props.user.id}`, {
      signedIn: false,
    })
    .then(() => this.props.logoutFunction(this.props.user))
    .catch(() => this.setState({
      error: true,
      statusMessage: `Could not sign out ${this.props.user.fullName}`,
    }));
    this.props.logoutFunction(this.props.user);
  }

  render() {
    return <button onClick={this.handleClick}>Sign out</button>;
  }
}

Logout.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    fullName: React.PropTypes.string,
  }),
  logoutFunction: React.PropTypes.func,
};
