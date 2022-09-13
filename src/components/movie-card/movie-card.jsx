/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

// External Dependencies
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Internal Dependencies
import './movie-card.scss';

// Component
class MovieCard extends React.Component {
  // Lifecycle Methods
  render() {
    // Props
    const { movieData, favorite, user } = this.props;

    // Class Methods
    function addFavorite() {
      axios
        .post(
          `https://kds-movie-api.herokuapp.com/users/${user}/favorites/${movieData._id}`,
          {},
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
        )
        .then(() => {
          alert(`${movieData.Title} was added to ${user}'s favourites.`);
          window.open(`/users/${user}`, '_self');
        })
        .catch((err) => console.log(err));
    }

    function deleteFavorite() {
      axios
        .delete(
          `https://kds-movie-api.herokuapp.com/users/${user}/favorites/${movieData._id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
        )
        .then(() => {
          alert(`${movieData.Title} was removed from ${user}'s favourites.`);
          window.open(`/users/${user}`, '_self');
        })
        .catch((err) => console.log(err));
    }

    function favoriteVariant() {
      if (!favorite) {
        return <Button variant="favorite" onClick={() => addFavorite(movieData._id, movieData.Title)}>Favorite</Button>;
      } return <Button variant="secondary" onClick={() => deleteFavorite(movieData._id, movieData.Title)}>Remove</Button>;
    }

    // JSX
    return (
      <Card key={movieData._id} className="movie-card">
        <Card.Img variant="top" src={movieData.ImageURL} thumbnail="true" crossOrigin="anonymous" />
        <Card.Body className="movie-card-body">
          <Card.Title className="movie-card-title">{movieData.Title}</Card.Title>
          <Link to={`/movies/${movieData._id}`}>
            <Button variant="movie-detail">See More</Button>
          </Link>
          {favoriteVariant()}
        </Card.Body>
      </Card>
    );
  }
}

// PropTypes
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }).isRequired,
    Featured: PropTypes.bool.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

// Export
export default MovieCard;
