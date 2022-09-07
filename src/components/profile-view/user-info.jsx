import React from 'react';
import PropTypes from 'prop-types';

function UserInfo(props) {
  const { username, email, birth } = props;

  return (
    <div>
      <h2>Your Info:</h2>
      <p>{`Username: ${username}`}</p>
      <p>{`Email: ${email}`}</p>
      <p>{`Birthday: ${birth.slice(0, 10)}`}</p>
    </div>
  );
}

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birth: PropTypes.instanceOf(Date).isRequired,
};

export default UserInfo;
