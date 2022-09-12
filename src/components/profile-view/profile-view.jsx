/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserInfo from './user-info';
import UpdateUser from './update-user';
import FavoriteMovies from './favorite-movies';
import { setUser } from '../../actions/actions';

function ProfileView(props) {
  // Read State
  const { movies, user, token, userdata } = props;
  const { setUser } = props;
  const { Username, Email, Birthday, Password } = userdata.user;
  const favoriteMovies = userdata.user.FavoriteMovies;

  const getUser = () => {
    axios
      .get(
        `https://kds-movie-api.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => { setUser({ user: res.data, token: localStorage.getItem('token') }); })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    getUser(user);
  }, []);

  const deleteUser = () => {
    axios
      .delete(
        `https://kds-movie-api.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        alert(`${user}'s account was deleted.`);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>

      <UserInfo
        username={Username}
        email={Email}
        birth={Birthday}
      />

      <FavoriteMovies
        favoriteMovies={favoriteMovies}
        movies={movies}
        username={Username}
        user={user}
      />

      <UpdateUser
        token={token}
        username={Username}
        email={Email}
        birth={Birthday}
        password={Password}
      />
      <Button variant="danger" onClick={deleteUser}>Delete Profile</Button>
    </div>
  );
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({ userdata: state.userdata });

export default connect(mapStateToProps, { setUser })(ProfileView);
