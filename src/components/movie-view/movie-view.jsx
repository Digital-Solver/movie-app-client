/* eslint-disable react/prefer-stateless-function */

// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

// Internal Dependencies
import './movie-view.scss';

// Component
class MovieView extends React.Component {
  // Class Methods
  render() {
    const { movieData, onBackClick } = this.props;
    const posterAlt = `${movieData.Title} Poster`;

    // JSX
    return (
      <Card className="movie-view justify-content-md-center">
        <Card.Img variation="top" className="movie-poster" src={movieData.ImageURL} crossOrigin="anonymous" alt={posterAlt} />
        <Card.Title className="movie-title">{movieData.Title}</Card.Title>
        <Card.Body className="movie-description">{movieData.Description}</Card.Body>

        <div className="detail-navigation">
          <Link to={`/directors/${movieData.Director.Name}`}>
            <Button variant="movie-detail" className="movie-detail-button" type="button">Director</Button>
          </Link>

          <Link to={`/genres/${movieData.Genre.Name}`}>
            <Button type="button" variant="movie-detail">Genre</Button>
          </Link>
        </div>

        <Button type="button" onClick={() => { onBackClick(); }}>Back</Button>

      </Card>
    );
  }
}

// PropTypes
MovieView.propTypes = {
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
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }).isRequired,
    Featured: PropTypes.bool.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

// Export
export default MovieView;
