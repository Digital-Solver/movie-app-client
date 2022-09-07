/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';

import { Link } from 'react-router-dom';
import axios from 'axios';

class MovieCard extends React.Component {
  render() {
    const {
      movieData, favorite, user,
    } = this.props;

    function addFavorite() {
      const username = localStorage.getItem('user');
      axios
        .post(
          `https://kds-movie-api.herokuapp.com/users/${username}/favorites/${movieData._id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
        )
        .then(() => {
          alert(`${movieData.Title} was added to favourites.`);
          window.open(`/users/${username}`, '_self');
        })
        .catch((err) => console.log(err));
    }

    function deleteFavorite() {
      const username = localStorage.getItem('user');
      axios
        .delete(
          `https://kds-movie-api.herokuapp.com/users/${username}/favorites/${movieData._id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
        )
        .then(() => {
          alert(`${movieData.Title} was removed from favourites.`);
          window.open(`/users/${user}`, '_self');
        })
        .catch((err) => console.log(err));
    }

    function favoriteVariant() {
      if (!favorite) {
        return <Button variant="secondary" onClick={() => addFavorite(movieData._id, movieData.Title)}>Favorite</Button>;
      } return <Button variant="secondary" onClick={() => deleteFavorite(movieData._id, movieData.Title)}>Unfavorite</Button>;
    }

    return (
      <Card className="movie-card" style={{ borderRadius: '5px' }}>
        <Card.Img variant="top" src={movieData.ImageURL} thumbnail="true" />
        <Card.Body style={{ backgroundColor: '#77685D', borderRadius: '0px 0px 5px 5px' }}>
          <Card.Title style={{ color: 'white' }}>{movieData.Title}</Card.Title>

          <Link to={`/movies/${movieData._id}`}>
            <Button style={{ backgroundColor: '#058ED9' }}>See More</Button>
          </Link>
          {favoriteVariant()}
        </Card.Body>
      </Card>
    );
  }
}

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
export default MovieCard;
