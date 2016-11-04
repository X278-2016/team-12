import * as React from 'react';

function UserEntry(props) {
  return (
    <button onClick={props.onClick}>{props.user.fullName}</button>
  );
}

UserEntry.propTypes = {
  user: React.PropTypes.shape({
    fullName: React.PropTypes.string.isRequired,
  }),
  onClick: React.PropTypes.func.isRequired,
};

export default UserEntry;
