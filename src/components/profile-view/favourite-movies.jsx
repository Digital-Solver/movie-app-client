import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function FavouriteMovies({ favouriteMovies }) {
  const getFavouriteMovies = () => {
    if (!favouriteMovies) {
      return <p>Favourite Some Movies To See Your List</p>;
    }
    return favouriteMovies.map((movies) => (
      <div key={movies._id}>
        <img src={movies.ImageURL} alt={`Poster of the movie: ${movies.Title}`} />
        <Link to={`/movies/${movies._id}`}>
          <h4>{movies.Title}</h4>
        </Link>
        <Button variant="secondary" onClick={() => removeFavourite(movies._id)}>Remove From Favourites</Button>
      </div>
    ));
  };

  return (
    <div>
      <h2>Favourite Movies:</h2>
      {getFavouriteMovies()}
    </div>
  );
}

export default FavouriteMovies;

FavouriteMovies.PropTypes = {
  favouriteMoviesList: PropTypes.shape({}).isRequired,
};
