import * as React from 'react';

function UserInfoWindow(props) {
  return (
    <div>
      <p>Name: {props.user.fullName}</p>
    </div>
);
}

UserInfoWindow.propTypes = {
  user: React.PropTypes.shape({
    fullName: React.PropTypes.string.isRequired,
  }),
};

export default AdminInfoWindow;
