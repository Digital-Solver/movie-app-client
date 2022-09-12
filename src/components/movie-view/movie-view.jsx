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
      <Card className="movie-view justify-content-md-center" style={{ backgroundColor: '#77685D', borderRadius: '5px', maxWidth: '500px' }}>
        <Card.Img variation="top" className="movie-poster" src={movieData.ImageURL} crossOrigin="anonymous" alt={posterAlt} style={{ width: '15rem', marginInline: 'auto' }} />
        <Card.Title style={{ color: 'white' }} className="movie-title">{movieData.Title}</Card.Title>
        <Card.Body style={{ color: 'white' }} className="movie-description">{movieData.Description}</Card.Body>

        <div
          className="detail-navigation"
          style={{
            marginBottom: '40px',
            marginInline: '10px',
            width: '50%',
            display: 'inline-flex',
            alignSelf: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Link to={`/directors/${movieData.Director.Name}`}>
            <Button style={{ backgroundColor: 'rgb(72, 61, 63)', borderColor: '#00000000' }} type="button">Director</Button>
          </Link>

          <Link to={`/genres/${movieData.Genre.Name}`}>
            <Button style={{ backgroundColor: 'rgb(72, 61, 63)', borderColor: '#00000000' }} type="button">Genre</Button>
          </Link>
        </div>

        <Button style={{ backgroundColor: '#058ED9' }} type="button" onClick={() => { onBackClick(); }}>Back</Button>

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
      Birth: PropTypes.instanceOf(Date).isRequired,
      Death: PropTypes.instanceOf(Date),
    }).isRequired,
    Featured: PropTypes.bool.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

// Export
export default MovieView;
