import * as React from 'react';

function Certifications(props) {
  const certifications = props.user.certifications;
  const elements = [];
  certifications.forEach(cert => elements.push(<li>{cert.name}</li>));

  return (
    <ul>{certifications}</ul>
  );
}

Certifications.propTypes = {
  user: React.PropTypes.shape({
    certifications: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
      })
    ),
  }),
};

export default Certifications;
