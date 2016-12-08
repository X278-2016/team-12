import * as React from 'react';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

// Not much in Admin yet. Just a sign in screen which will display AdminPanel if login is successful.
// NOTE: this definitely needs a rewrite with an eye towards security--we've got plaintext passwords, no salting, etc.
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
