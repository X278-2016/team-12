import * as React from 'react';

function UserInfoWindow(props) {
  return (
    <div>
      <p>Name: {props.user.fullName}</p>
      <p>Email: {props.user.email}</p>
      <p>Major: {props.user.major}</p>
      <p>School: {props.user.school}</p>
    </div>
  );
}

UserInfoWindow.propTypes = {
  user: React.PropTypes.shape({
    fullName: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    major: React.PropTypes.string.isRequired,
    school: React.PropTypes.string.isRequired,
  }),
};

export default UserInfoWindow;
