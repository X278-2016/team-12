import * as React from 'react';

function MachinesCanUse(props) {
  return (
    <div>Hello World, {props.user.fullName}</div>
  );
}

MachinesCanUse.propTypes = {
  user: React.PropTypes.shape({
    fullName: React.PropTypes.string.isRequired,
  }),
};

export default MachinesCanUse;
