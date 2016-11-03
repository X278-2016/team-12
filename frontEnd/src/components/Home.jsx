import * as React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', userData: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit() {
    this.setState({ userData: 'Loading' });
    const request = new XMLHttpRequest();
    const root = 'http://localhost:3000';
    const mReact = this;
    request.addEventListener('load', () => {
      const data = JSON.parse(request.responseText);
      mReact.setState({ value: mReact.state.value, userData: data.email });
    });
    request.open('GET', `${root}/users/1`);
    request.send();
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
        <p>Body: {this.state.userData.body}</p>
      </div>
    );
  }
}
