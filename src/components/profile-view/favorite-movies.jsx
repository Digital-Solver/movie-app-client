/* eslint-disable no-underscore-dangle */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Col } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';

function FavoriteMovies(props) {
  const { favoriteMovies, movies, removeFavorite } = props;

  const getFavoriteMovies = () => {
    if (!favoriteMovies) {
      return <p>Favorite Some Movies To See Your List</p>;
    }
    return movies.map((mov) => (
      // if (favoriteMovies.includes(mov._id)) {
      //   return
      // }
      <Col md={4}>
        <MovieCard movieData={mov} key={mov._id} />
        <Button variant="secondary" onClick={() => removeFavorite(movies._id, movies.Title)}>Unfavorite</Button>
      </Col>
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
  removeFavorite: PropTypes.func.isRequired,
};
