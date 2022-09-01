/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function registrationView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form action="submit">
      <label>
        Register a Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Register a Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

registrationView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};
