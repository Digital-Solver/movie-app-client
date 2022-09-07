import React from 'react';
import PropTypes from 'prop-types';

function UserInfo(props) {
  const { username, email, birthday } = props;

  return (
    <div>
      <h2>Your Info:</h2>
      <p>{`Username: ${username}`}</p>
      <p>{`Email: ${email}`}</p>
      <p>{`Birthday: ${birthday}`}</p>
    </div>
  );
}

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.instanceOf(Date).isRequired,
};

export default UserInfo;
