import * as React from 'react';
import * as axios from 'axios';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', userData: '', signedIn: 'enter next card' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit() {
    this.setState({ userData: 'Loading' });
    axios.get('http://localhost:3000/users/1')
      .then((getResponse) => {
        const user = getResponse.data;
        this.setState({ userData: user });
        user.signedIn = true;
        axios.put('http://localhost:3000/users/1', user)
          .then((postResponse) => {
            if (postResponse.status === 200) {
              this.setState({ signedIn: 'yes' });
              setTimeout(() => {
                this.setState({ signedIn: 'enter next card' });
              }, 2000);
            }
          });
      });
  }

  render() {
    return (
      <div>
        <h1>User Data</h1>
        <input
          type="text"
          placeholder="Enter a username"
          value={this.state.value}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <button onClick={this.handleSubmit}>Submit</button>
        <p>Signed in: {this.state.signedIn}</p>
      </div>
    );
  }
}
