/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function loginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedInUser(username);
  };

  return (
    <form action="submit">

      <label>
        Existing Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <br />

      <label>
        Existing Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <br />

      <button type="submit" onClick={handleSubmit}>Login</button>

    </form>
  );
}

loginView.propTypes = {
  onLoggedInUser: PropTypes.func.isRequired,
};
