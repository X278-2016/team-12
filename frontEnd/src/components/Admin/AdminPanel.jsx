import * as React from 'react';

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddUser: false,
      showRemoveUser: false,
      showAddEquipment: false,
      showRemoveEquipment: false,
      showAddCert: false,
      showRemoveCert: false,
      showAddAdmin: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleLogin(false);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Logout</button>
        <div>
          <h2>Info</h2>
          <ul>
            <li>Admin: {this.props.adminData && this.props.adminData.name}</li>
          </ul>
        </div>
      </div>
    );
  }


}
