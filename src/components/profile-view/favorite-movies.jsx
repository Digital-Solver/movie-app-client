import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function FavoriteMovies({ props }) {
  
  
  const getFavoriteMovies = () => {
    if (!favoriteMovies) {
      return <p>Favorite Some Movies To See Your List</p>;
    }
    return favoriteMovies.map((movies) => (
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

FavoriteMovies.PropTypes = {
  favoriteMoviesList: PropTypes.shape({}).isRequired,
};
