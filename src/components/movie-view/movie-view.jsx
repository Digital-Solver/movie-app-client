/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-view.scss';

class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    const posterAlt = `${movie.Title} Poster`;

    return (
      <Card className="movie-view justify-content-md-center" style={{ backgroundColor: '#77685D', borderRadius: '5px' }}>
        <Card.Img variation="top" className="movie-poster" src={movie.ImageURL} alt={posterAlt} style={{ width: '15rem', marginInline: 'auto' }} />
        <Card.Title style={{ color: 'white' }} className="movie-title">{movie.Title}</Card.Title>
        <Card.Body style={{ color: 'white' }} className="movie-description">{movie.Description}</Card.Body>
        <Button style={{ backgroundColor: '#058ED9' }} type="button" onClick={() => { onBackClick(null); }}>Back</Button>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.instanceOf(Date).isRequired,
      Death: PropTypes.instanceOf(Date),
    }).isRequired,
    Featured: PropTypes.bool.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,

  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
