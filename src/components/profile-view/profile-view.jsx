/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
/* eslint-disable no-alert */

// Profile view:
// Receives: movies & Userdata (both objects)
// State: Userdata
// Display: User Info, & Favourite Movies List
// Methods: Update Info, Delete Profile, Remove Favourites

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import UserInfo from './user-info';
import FavouriteMovies from './favourite-movies';
import UpdateUser from './update-user';

export default function ProfileView() {
  const [userData, setUserData] = useState('');
  const { Username, Email, FavoriteMovies, Birth } = userData;

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
      .then((res) => setUserData(res.data))
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    getUser(user);
  }, []);

  return (
    <div>
      <UserInfo username={Username} email={Email} />
      <FavouriteMovies favouriteMovies={FavoriteMovies} />
      <UpdateUser token={token} user={user} username={Username} email={Email} birth={Birth} />
      <Button variant="danger" onClick={deleteUser}>Delete Profile</Button>
    </div>
  );
}