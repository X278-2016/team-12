import * as React from 'react';

function AdminInfoWindow(props) {
  return (
    <div>
      <p>Name: {props.admin.name}</p>
      <p>Username: {props.admin.username}</p>
    </div>
);
}

AdminInfoWindow.propTypes = {
  user: React.PropTypes.shape({
    fullName: React.PropTypes.string.isRequired,
  }),
};

export default AdminInfoWindow;
