/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */

//  External Dependencies
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

// Styles
import './profile-view.scss';

// Action Creators
import {
  setUsername,
  setPassword,
  setEmail,
  setBirthday } from '../../actions/actions';

// Component
function UpdateUser(props) {
  // Props
  const {
    userdata,
    setUsername,
    setPassword,
    setEmail,
    setBirthday } = props;

  // Methods
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `https://kds-movie-api.herokuapp.com/users/${localStorage.getItem('user')}`,
        {
          Username: userdata.user.Username,
          Email: userdata.user.Email,
          Password: userdata.user.Password,
          Birthday: userdata.user.Birthday,
        },
        { headers: { Authorization: `Bearer ${userdata.token}`, 'Content-Type': 'application/json' } },
      )
      .then(() => {
        alert(`${userdata.user.Username}'s profile has been updated.`);
        localStorage.setItem('user', userdata.user.Username);
        window.open(`/users/${userdata.user.Username}}`, '_self');
      })
      .catch((err) => console.error(err));
  };

  const deleteUser = () => {
    axios
      .delete(
        `https://kds-movie-api.herokuapp.com/users/${userdata.user.Username}`,
        { headers: { Authorization: `Bearer ${userdata.token}` } },
      )
      .then(() => {
        alert(`${userdata.user.Username}'s account was deleted.`);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
      })
      .catch((err) => console.log(err));
  };

  // JSX
  return (
    <div className="user-info-container">
      <form className="profile-form user-info-container" onSubmit={handleSubmit}>

        <label>
          username
          <input type="text" name="Username" defaultValue={userdata.user.Username} onChange={(e) => setUsername(e.target.value)} />
        </label>

        <label>
          email
          <input type="email" name="Email" defaultValue={userdata.user.Email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          password
          <input type="password" name="Password" required defaultValue="" onChange={(e) => setPassword(e.target.value)} />
        </label>

        <label>
          birthday
          <input type="date" name="DoB" defaultValue={userdata.user.Birthday ? userdata.user.Birthday.slice(0, 10) : userdata.user.Birthday} onChange={(e) => setBirthday(e.target.value)} />
        </label>

        <div className="edit-user-button-container">
          <Button type="submit" variant="credential">Submit</Button>
          <Button variant="danger" onClick={deleteUser}>Delete Profile</Button>
        </div>
      </form>
    </div>
  );
}

// PropTypes
UpdateUser.propTypes = {
  userdata: PropTypes.shape({
    user: PropTypes.shape({
      Username: PropTypes.string,
      Password: PropTypes.string,
      Email: PropTypes.string,
      Birthday: PropTypes.string,
    }),
    token: PropTypes.string,
  }).isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setBirthday: PropTypes.func.isRequired,
};

// Redux & Export
function mapStateToProps(state) {
  const { userdata } = state;
  return { userdata };
}

export default connect(mapStateToProps, {
  setUsername,
  setPassword,
  setEmail,
  setBirthday,
})(UpdateUser);
