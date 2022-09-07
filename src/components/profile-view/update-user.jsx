/* eslint-disable no-alert */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function UpdateUser(props) {
  const {
    token, user, username, email, birth,
  } = props;

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBirthday, setNewBirthday] = useState('');

  const handleSubmit = () => {
    axios
      .put(
        `https://kds-movie-api.herokuapp.com/users/${user}`,
        {
          Username: newUsername,
          Password: newPassword,
          Email: newEmail,
          Birthday: newBirthday,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        setUserData(res);
        alert(`${username}'s profile has been updated.`);
        window.open(`/users/${user}}`, '_self');
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit()}>
      <h2>Edit Profile: </h2>

      <label>
        Username:
        <input type="text" name="Username" defaultValue={username} onChange={(e) => setNewUsername(e.target.value)} />
      </label>

      <label>
        Password:
        <input type="password" name="Password" defaultValue="********" onChange={(e) => setNewPassword(e.target.value)} />
      </label>

      <label>
        Email:
        <input type="email" name="Email" defaultValue={email} onChange={(e) => setNewEmail(e.target.value)} />
      </label>

      <label>
        Date of Birth:
        <input type="date" name="DoB" defaultValue={birth} onChange={(e) => setNewBirthday(e.target.value)} />
      </label>

      <button type="submit">Submit</button>

    </form>
  );
}

UpdateUser.propTypes = {
  user: PropTypes.shape().isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birth: PropTypes.instanceOf(Date).isRequired,
  token: PropTypes.string.isRequired,
};
