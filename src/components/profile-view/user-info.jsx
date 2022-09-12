// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './profile-view.scss';

// Component
function UserInfo(props) {
  // Props
  const {
    username,
    email,
    birth,
  } = props;

  // JSX
  return (
    <div>
      <h2>Your Info:</h2>
      <p>{`Username: ${username}`}</p>
      <p>{`Email: ${email}`}</p>
      <p>{`Birthday: ${birth.slice(0, 10)}`}</p>
    </div>
  );
}

// PropTypes
UserInfo.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  birth: PropTypes.string,
};
UserInfo.defaultProps = {
  username: '',
  email: '',
  birth: '',
};

// Export
export default UserInfo;
