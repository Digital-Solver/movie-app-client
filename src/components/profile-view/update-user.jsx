/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function UpdateUser(props) {
  const {
    token, username, email, birth, password,
  } = props;

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBirthday, setNewBirthday] = useState('');

  const handleSubmit = () => {
    axios
      .put(
        `https://kds-movie-api.herokuapp.com/users/${username}`,
        {
          Username: newUsername || username, // FIX: server-side val: prevent duplicate users
          Email: newEmail || email,
          Birthday: newBirthday || birth,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        console.log(`Axios request included; ${{
          Username: newUsername || username, // FIX: server-side val: prevent duplicate users
          Email: newEmail || email,
          Birthday: newBirthday || birth,
        }}`);
        console.log(`${username}'s profile has been updated.`);
        localStorage.setItem('user', newUsername);
        window.open(`/users/${newUsername}}`, '_self');
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>Edit Profile: </h2>

      <label>
        Username:
        <input type="text" name="Username" defaultValue={username} onChange={(e) => setNewUsername(e.target.value)} />
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
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birth: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
