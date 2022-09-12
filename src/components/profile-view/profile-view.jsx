/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
/* eslint-disable no-alert */

// External Dependencies
import React, { useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Internal Dependencies
import UserInfo from './user-info';
import UpdateUser from './update-user';
import FavoriteMovies from './favorite-movies';
import { setUserdata } from '../../actions/actions';

// Component
function ProfileView(props) {
  // Props
  const {
    movies,
    userdata,
    setUserdata } = props;

  // Methods
  const getUser = () => {
    axios
      .get(
        `https://kds-movie-api.herokuapp.com/users/${userdata.user.Username}`,
        { headers: { Authorization: `Bearer ${userdata.token}` } },
      )
      .then((res) => { setUserdata({ user: res.data, token: localStorage.getItem('token') }); })
      .catch((err) => { console.log(err); });
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

  useEffect(() => { getUser(userdata.user.Username); }, []);

  // JSX
  return (
    <main className="profile">
      <UserInfo
        username={userdata.user.Username}
        email={userdata.user.Email}
        birth={userdata.user.Birthday}
      />

      <FavoriteMovies
        favoriteMovies={userdata.user.FavoriteMovies}
        movies={movies}
        username={userdata.user.Username}
        user={userdata.user.Username}
      />

      <UpdateUser
        userdata={userdata}
      />
      <Button variant="danger" onClick={deleteUser}>Delete Profile</Button>
    </main>
  );
}

// PropTypes
ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  userdata: PropTypes.shape({
    user: PropTypes.shape({
      Username: PropTypes.string,
      Password: PropTypes.string,
      Email: PropTypes.string,
      Birthday: PropTypes.string,
      FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
    }),
    token: PropTypes.string,
  }).isRequired,
  setUserdata: PropTypes.func.isRequired,
};

// Redux & Export
const mapStateToProps = (state) => ({ userdata: state.userdata });

export default connect(mapStateToProps, { setUserdata })(ProfileView);
