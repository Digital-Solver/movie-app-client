/* eslint-disable no-underscore-dangle */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function FavoriteMovies(props) {
  const { favoriteMovies, movies } = props;

  const removeFavorite = (username, id, title) => {
    axios
      .put(`https://kds-movie-api.herokuapp.com/users/${username}/favorites/${id}`)
      .then((res) => {
        console.log(res);
        alert(`Removed ${title} from favourites.`);
      })
      .catch((err) => console.log(err));
  };

  const getFavoriteMovies = () => {
    if (!favoriteMovies) {
      return <p>Favorite Some Movies To See Your List</p>;
    }
    return favoriteMovies.map(() => (
      <div key={movies._id}>
        <img src={movies.ImageURL} alt={`Poster of the movie: ${movies.Title}`} />
        <Link to={`/movies/${movies._id}`}>
          <h4>{movies.Title}</h4>
        </Link>
        <Button variant="secondary" onClick={() => removeFavorite(movies._id)}>Remove From Favorites</Button>
      </div>
    ));
  };

  return (
    <div>
      <h2>Favorite Movies:</h2>
      {getFavoriteMovies()}
    </div>
  );
}

export default FavoriteMovies;

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.shape({}).isRequired,
  movies: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
