import * as React from 'react';

export default class UserInput extends React.Component {
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
    const root = 'https://jsonplaceholder.typicode.com';
    const mReact = this;
    request.addEventListener('load', () => {
      const data = JSON.parse(request.responseText);
      mReact.setState({ value: mReact.state.value, userData: data });
    });
    request.open('GET', `${root}/posts/1`);
    request.send();
  }

  render() {
    return (
      <div>
        <h3>User Data</h3>
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
