import * as React from 'react';
import * as axios from 'axios';

export default class ResourceLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleResources: [],
      usedResources: [],
      error: false,
    };
    this.input = {};
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/resources')
      .then((response) => {
        this.setState({ possibleResources: response.data });
        // placeholder, for now until you can record resource usage
        this.props.addResources(response.data);
      })
      .catch(() => this.setState({ error: true }));
  }

  saveAndContinue(event) {

  }

  handleChange(event) {
    console.log(event.target);
  }

  render() {
    let resourceForm = null;
    if (this.state.possibleResources.length > 0) {
      const resourceInputs = this.state.possibleResources.map((resource, index) =>
        (<input
          key={index}
          type="text"
          placeholder={resource.name}
          onChange={this.handleChange}
          id={index}
        />),
      );
      resourceForm = (
        <div>
          {resourceInputs}
          <button onClick={this.saveAndContinue}>Finish logout</button>
        </div>
      );
    }
    return (
      <div>
        <h2>Before logout, record resources used</h2>
        <form>
          {resourceForm}
        </form>
      </div>
    );
  }
}

ResourceLog.propTypes = {
  addResources: React.PropTypes.func.isRequired,
  finishLogoutProcess: React.PropTypes.func.isRequired,
};
