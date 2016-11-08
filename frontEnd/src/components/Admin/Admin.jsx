import * as React from 'react';

function Admin() {
  return (
      <div>
        <h1>Admin Sign In</h1>
        <input
            type="text"
            placeholder="Enter your username"
            value={this.state.username}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
        />
        <br/>
        <input
            type="text"
            placeholder="Enter your password"
            value={this.state.hashedPass}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
        />
        <br/>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
  );
}

export default Admin;

