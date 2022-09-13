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
    <div className="user-info-container">
      <p className="user-info-username h2">{`${username}`}</p>
      <p>{`${email}`}</p>
      <p>{`${birth.slice(0, 10)}`}</p>
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
