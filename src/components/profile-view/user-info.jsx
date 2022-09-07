import React from 'react';

function UserInfo(username, email, birthday) {
  return (
    <div>
      <h2>Your Info:</h2>
      <p>{`Username: ${username}`}</p>
      <p>{`Email: ${email}`}</p>
      <p>{`Birthday: ${birthday}`}</p>
    </div>
  );
}

export default UserInfo;
