import * as React from 'react';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      adminData: {},
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.setAdminData = this.setAdminData.bind(this);
  }

  setAdminData(data) {
    this.setState({ adminData: data });
  }

  handleLogin(loggedIn) {
    this.setState({ isLoggedIn: loggedIn });
  }

  render() {
    if (this.state.isLoggedIn) {
      return <AdminPanel handleLogin={this.handleLogin} adminData={this.state.adminData} />;
    }
    return <AdminLogin handleLogin={this.handleLogin} setAdminData={this.setAdminData} />;
  }
}
