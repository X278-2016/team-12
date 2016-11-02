import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', userData: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ userData: 'Loading' });
    let request = new XMLHttpRequest();
    let root = 'https://jsonplaceholder.typicode.com';
    let _this = this;
    request.addEventListener('load', function() {
      let data = JSON.parse(request.responseText);
      _this.setState({ value: _this.state.value, userData: data });
    });
    request.open('GET', root + '/posts/1');
    request.send();
  }

  render() {
    return (
      <div>
        <h3>User Data</h3>
        <input
          type ='text'
          placeholder ='Enter a username'
          value = { this.state.value }
          onChange = { this.handleChange }
          onSubmit = { this.handleSubmit }
        />
        <button onClick = { this.handleSubmit }>Submit</button>
        <p>Body: {this.state.userData.body}</p>
      </div>
    )
  }
}