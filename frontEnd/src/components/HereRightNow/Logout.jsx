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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const mongoID = this.props.user.id;
    axios.patch(`http://localhost:3000/users/${mongoID}`, {
      signedIn: false,
    })
      .then((getResponse) => {
        if (getResponse.data.length !== 1) {
          this.setState({ error: true, statusMessage: 'Could not find the user' });
        } else {
          this.setState({ statusMessage: 'User found, signing out', user: getResponse.data[0] });
        }
      }).catch(() => {
        this.setState({ error: true, signedIn: false });
      });
  }

  render() {
    return <button onClick={this.handleSubmit}>Sign out</button>;
  }
}

Logout.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  }),
};
