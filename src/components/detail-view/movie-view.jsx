/* eslint-disable react/prefer-stateless-function */

// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import {
  Button, Card, Row, Col,
} from 'react-bootstrap';

// Internal Dependencies
import './detail-view.scss';

// Component
function MovieView(props) {
  // Class Methods
  const { movieData, onBackClick } = props;

  const location = useLocation();
  if (!movieData) { const { movieData } = location.state; }
  console.log(movieData);

  const posterAlt = `${movieData.Title} Poster`;
  // JSX
  return (
    <Card className="detail-view justify-content-md-center">
      <Row className="detail-view-row">
        <Col className="detail-view-poster-container" lg={12} xl={6}>
          <Card.Img variation="top" className="movie-poster" src={movieData.ImageURL} crossOrigin="anonymous" alt={posterAlt} />
        </Col>

        <Col lg={12} xl={6} className="detail-view-content-outer-container">
          <div className="detail-view-content-inner-container">
            <Card.Title className="movie-title">{movieData.Title}</Card.Title>
            <div className="detail-navigation">
              <Link to={{ pathname: `/movies/${movieData._id}`, state: { movieData } }}>
                <Button variant="movie-active-detail" className="movie-detail-button" type="button">Scynopsis</Button>
              </Link>
              <Link to={{ pathname: `/directors/${movieData.Director.Name}`, state: { movieData } }}>
                <Button variant="movie-detail" className="movie-detail-button" type="button">Director</Button>
              </Link>
              <Link to={{ pathname: `/genres/${movieData.Genre.Name}`, state: { movieData } }}>
                <Button type="button" variant="movie-detail">Genre</Button>
              </Link>
            </div>
            <Card.Body className="movie-description">{movieData.Description}</Card.Body>
            <Button type="button" onClick={() => { onBackClick(); }}>Back</Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

// PropTypes
MovieView.propTypes = {
  movieData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
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
