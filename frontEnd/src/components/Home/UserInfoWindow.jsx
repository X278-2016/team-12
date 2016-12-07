import * as React from 'react';
import MachinesCanUse from './MachinesCanUse';

function UserInfoWindow(props) {
  return (
    <div>
      <h2>User</h2>
      <p>Name: {props.user.fullName}</p>
      <p>Email: {props.user.email}</p>
      <p>Major: {props.user.major}</p>
      <p>School: {props.user.school}</p>
      <h3>Machine privileges</h3>
      <MachinesCanUse user={props.user} />
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
