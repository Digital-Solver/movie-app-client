/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UserInfo from './user-info';
import UpdateUser from './update-user';
import FavoriteMovies from './favorite-movies';

function ProfileView(props) {
  const { movies } = props;
  const [userData, setUserData] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { Username, Email, Birthday } = userData; // I can find a list of favourite movie ID's here if needed
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

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

  const getUser = () => {
    axios
      .get(
        `https://kds-movie-api.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => { setUserData(res.data); setFavoriteMovies(res.data.FavoriteMovies); })
      .catch((err) => { console.log(err); });
  };

  const removeFavorite = (id, title) => {
    axios
      .put(
        `https://kds-movie-api.herokuapp.com/users/${user}/favorites/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        console.log(res);
        alert(`Removed ${title} from favourites.`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser(user);
  }, []);

  return (
    <div>
      {console.log(userData)}

      <UserInfo
        username={Username}
        email={Email}
        birth={Birthday}
      />

      <FavoriteMovies
        favoriteMovies={favoriteMovies}
        movies={movies}
        removeFavorite={removeFavorite}
      />

      <UpdateUser
        token={token}
        user={user}
        username={Username}
        email={Email}
        birth={Birthday}
      />
      <Button variant="danger" onClick={deleteUser}>Delete Profile</Button>
    </div>
  );
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ProfileView;
