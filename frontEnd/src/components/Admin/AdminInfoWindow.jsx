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
  admin: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
  }),
};

export default AdminInfoWindow;
