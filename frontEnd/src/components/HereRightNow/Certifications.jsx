import * as React from 'react';

function Certifications(props) {
  const certifications = props.user.certifications;
  let elements = null;
  if (certifications.length > 0) {
    elements = certifications.map(cert => <li key={cert.id}>{cert.name}</li>);
  } else {
    elements = <div />;
  }

  return (
    <ul>{elements}</ul>
  );
}

Certifications.propTypes = {
  user: React.PropTypes.shape({
    certifications: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
      }),
    ),
  }),
};

export default Certifications;
