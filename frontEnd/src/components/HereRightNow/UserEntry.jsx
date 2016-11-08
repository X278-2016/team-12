import * as React from 'react';

export default class UserEntry extends React.Component {
  constructor(props) {
    super(props);
    this.clickWrapper = this.clickWrapper.bind(this);
  }

  clickWrapper() {
    this.props.onClick(this.props.user);
  }

  render() {
    return (
      <button onClick={this.clickWrapper}>{this.props.user.fullName}</button>
    );
  }
}

UserEntry.propTypes = {
  user: React.PropTypes.shape({
    fullName: React.PropTypes.string.isRequired,
  }),
  onClick: React.PropTypes.func.isRequired,
};
